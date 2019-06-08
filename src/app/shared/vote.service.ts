import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Vote, Ballot, Selection, ChoiceSelection } from '../core';
import { ConfigService } from './config/config.service';
import { CryptoService } from './crypto/crypto.service';
import { ElectionService } from './election.service';
import { WindowRef } from './window-ref';

@Injectable()
export class VoteService {
    private get WITH_CREDENTIALS(): boolean { return this._config.get('withCredentials'); };
    private get VOTE_URL(): string { return this._config.get('voteUrl'); };
    private get VOTE_PROGRESS_KEY(): string { return 'vote_progress '; };

    private _vote: Vote;
    private _storage: Storage;
    private _sessionKey: string;

    constructor(
        private _config: ConfigService,
        private _cryptoService: CryptoService,
        private _electionService: ElectionService,
        private _http: Http,
        private _window: WindowRef
    ) {
        this._storage = this._window.nativeWindow.sessionStorage;
    }

    get vote(): Vote {
        return this._vote;
    };

    set sessionKey(key: string) {
        this._sessionKey = key;
    }

    updatePath(path: string) {
        if (this._vote) {
            this._vote.path = path;
            this.save();
        }
    }

    init(ballot: Ballot) {
        const vote = {
            selections: [],
            path: ''
        };

        ballot.contests.forEach((contest) => {
            const selection = {
                selectedCount: 0,
                contest: contest.id,
                choiceData: {
                    choices: []
                }
            };

            if (contest.choices) {
                contest.choices.forEach((choice) => {
                    selection.choiceData.choices.push({
                        contest: contest.id,
                        choice: choice.id,
                        weight: 0,
                        writein: false
                    });
                });

                if (contest.writein) {
                    selection.choiceData.choices.push({
                        contest: contest.id,
                        choice: '',
                        weight: 0,
                        writein: true
                    });
                }
            }

            vote.selections.push(selection);
        });

        this._vote = vote;
        this.save();
    }

    save() {
        this._cryptoService.encryptProgress(this._vote, this._sessionKey).subscribe((encrypted) => {
            this._storage.setItem(this.VOTE_PROGRESS_KEY, encrypted);
        });
    }

    restore(): Observable<boolean> {
        const encryptedString = this._storage.getItem(this.VOTE_PROGRESS_KEY);
        if (this._sessionKey && encryptedString) {
            return this._cryptoService.decryptProgress(encryptedString, this._sessionKey)
                .map((result) => {
                    this._vote = result;
                    return true;
                })
                .catch(() => {
                    console.log(`Unable to restore vote progress.`);
                    return Observable.of(false);
                });
        }

        return Observable.of(false);
    }

    clear() {
        this._vote = null;
        this._sessionKey = null;
        this._storage.removeItem(this.VOTE_PROGRESS_KEY);
    }

    getSelection(contestIndex: number): Selection {
        return this._vote ? this._vote.selections[contestIndex] : null;
    }

    getChoiceSelection(contestIndex: number, choiceIndex: number): ChoiceSelection {
        const selection = this.getSelection(contestIndex);

        return selection ? selection.choiceData.choices[choiceIndex] : null;
    }

    getWriteInSelection(contestIndex: number): ChoiceSelection {
        const selection = this.getSelection(contestIndex);

        if (selection) {
            return selection.choiceData.choices.find((cs) => {
                return cs.writein;
            });
        }
        return null;
    }

    selectChoice(contestIndex: number, choiceIndex: number) {
        const selection = this.getSelection(contestIndex);
        const cs = this.getChoiceSelection(contestIndex, choiceIndex);

        if (selection && cs) {
            cs.weight = 1;
            selection.selectedCount++;
            this.save();
        }
    }

    selectWriteIn(contestIndex: number) {
        const selection = this.getSelection(contestIndex);
        const cs = this.getWriteInSelection(contestIndex);

        if (selection && cs) {
            cs.weight = 1;
            selection.selectedCount++;
            this.save();
        }
    }

    deselectChoice(contestIndex: number, choiceIndex: number) {
        const selection = this.getSelection(contestIndex);
        const cs = this.getChoiceSelection(contestIndex, choiceIndex);

        if (selection && cs) {
            cs.weight = 0;
            selection.selectedCount--;
            this.save();
        }
    }

    deselectWriteIn(contestIndex: number) {
        const selection = this.getSelection(contestIndex);
        const cs = this.getWriteInSelection(contestIndex);

        if (selection && cs) {
            cs.weight = 0;
            selection.selectedCount--;
            this.save();
        }
    }

    toggleChoice(contestIndex: number, choiceIndex: number) {
        const selection = this.getSelection(contestIndex);
        const cs = this.getChoiceSelection(contestIndex, choiceIndex);

        if (selection && cs) {
            switch (cs.weight) {
                case 0:
                    cs.weight = 1;
                    selection.selectedCount++;
                    break;
                case 1:
                    cs.weight = 0;
                    selection.selectedCount--;
                    break;
            }

            this.save();
        }
    }

    rank(contestIndex: number, choiceIndex: number) {
        const selection = this.getSelection(contestIndex);
        const cs = this.getChoiceSelection(contestIndex, choiceIndex);

        if (selection && cs && cs.weight === 0) {
            const lastRank = selection.selectedCount;
            cs.weight = lastRank + 1;
            selection.selectedCount++;

            this.save();
        }
    }

    undo(contestIndex: number) {
        const selection = this.getSelection(contestIndex);
        const highestRank = selection.selectedCount;

        if (highestRank > 0) {
            for (let i = 0; i < selection.choiceData.choices.length; i++) {
                const cs = selection.choiceData.choices[i];

                if (cs.weight === highestRank) {
                    cs.weight = 0;
                    selection.selectedCount--;

                    this.save();
                    break;
                }
            }
        }
    }

    clearRank(contestIndex: number) {
        const selection = this.getSelection(contestIndex);
        selection.selectedCount = 0;

        selection.choiceData.choices.forEach((cs) => {
            cs.weight = 0;
        });

        this.save();
    }

    isSelected(contestIndex: number, choiceIndex: number): boolean {
        const cs = this.getChoiceSelection(contestIndex, choiceIndex);
        return cs && cs.weight > 0;
    }

    writeInSelected(contestIndex: number): boolean {
        const selection = this.getSelection(contestIndex);

        if (selection) {
            const writeInCs = selection.choiceData.choices.find((cs) => {
                return cs.writein;
            });

            return writeInCs.weight > 0;
        }
        return false;
    }

    getIndex(selection: Selection): number {
        return this._vote.selections.indexOf(selection);
    }

    submit(): Observable<any> {
        return this._cryptoService.encryptVote(this._vote, this._electionService.period.crypto.publickey)
            .switchMap((encryptedVote) => {
                return this._http.post(this.VOTE_URL, encryptedVote, { withCredentials: this.WITH_CREDENTIALS });
            });
    }
}
