import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Ballot, Choice, Contest } from '../core';
import { ConfigService } from './config/config.service';
import { VoteService } from './vote.service';
import { WindowRef } from './window-ref';

@Injectable()
export class BallotService {
    private get WITH_CREDENTIALS(): boolean { return this._config.get('withCredentials'); };

    private _ballot: Ballot;

    constructor(
        private _config: ConfigService,
        private _voteService: VoteService,
        private _http: Http
    ) { }

    loadBallot(): Observable<boolean> {
        const ballotUrl = this._config.get('ballotUrl');
        const url = `${ballotUrl}?expanded=true`;
        return this._http.get(url, { withCredentials: this.WITH_CREDENTIALS })
            .switchMap((res) => {
                if (!res.ok) {
                    return Observable.of(false);
                }

                const body = res.json();
                this._ballot = body.data;

                return this._voteService.restore()
                    .map((result) => {
                        if (!result) {
                            this._voteService.init(this._ballot);
                        }

                        return true;
                    });
            });
    }

    get ballot(): Ballot {
        return this._ballot;
    }

    getContest(index: number): Contest {
        if (!this._ballot) {
            return null;
        }

        return this._ballot.contests[index];
    }

    getChoice(contestIndex: number, choiceIndex: number): Choice {
        if (!this._ballot) {
            return null;
        }

        return this._ballot.contests[contestIndex].choices[choiceIndex];
    }

    clear() {
        this._ballot = null;
    }

    private _parseResponse(res: Response) {

    }
}
