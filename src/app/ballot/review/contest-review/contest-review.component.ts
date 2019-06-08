import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

import { Choice, Contest, ChoiceSelection, Selection, SelectedChoice } from '../../../core';
import { DictionaryService, EventLoggerService, VoteService } from '../../../shared';

@Component({
    selector: 'contest-review',
    templateUrl: 'contest-review.component.html',
    styleUrls: [
        'contest-review.component.scss',
        'contest-review.component.hc.scss'
    ]
})
export class ContestReviewComponent implements OnInit {
    private get CONTEST_PREFIX(): string { return 'contest'; };
    private get REVIEW_PREFIX(): string { return 'review'; };
    private get BALLOT_PREFIX(): string { return 'ballot'; };
    private get WRITE_IN_ID(): string { return 'write_in'; };

    changeSelection: Observable<string>;

    @Input()
    contest: Contest;

    selected: Observable<string>;
    selectedChoices: SelectedChoice[];
    title: Observable<string>;
    informalWarning: Observable<string>;
    undervoteWarning: Observable<string>;
    writeInWarning: Observable<string>;

    @Input()
    index: number;

    selection: Selection;
    writeIn: Observable<string>;
    writeInSelection: ChoiceSelection;

    constructor(
        private _dictionaryService: DictionaryService,
        private _eventLoggerService: EventLoggerService,
        private _voteService: VoteService,
    ) { }

    ngOnInit() {
        this.writeIn = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'writein');
        const infMsg = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'informalwarning');
        const infMsg2 = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'informalwarning2');
        const infMsg3 = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'informalwarning3');
        this.undervoteWarning = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'undervotewarning');
        this.writeInWarning = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'writeinwarning');
        this.changeSelection = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'changeselection');

        this.selected = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'selected', this.contest.id);
        this.title = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'title', this.contest.id);

        this.selectedChoices = [];

        this.selection = this._voteService.getSelection(this.index);

        this.selection.choiceData.choices.forEach((cs, index) => {
            if (!cs.writein) {
                const choice = this.contest.choices[index];
                if (cs.weight > 0) {
                    this.selectedChoices.push({
                        selection: cs,
                        choice: choice
                    });
                }
            } else {
                if (cs.weight > 0) {
                    this.writeInSelection = cs;
                }
            }
        });

        this.selectedChoices.sort((a, b) => {
            return a.selection.weight - b.selection.weight;
        });
        this.informalWarning = Observable.zip(infMsg, infMsg2, infMsg3, (msg1, msg2, msg3) => {
          return `${msg1} ${this.selection.selectedCount} ${msg2} ${this.contest.rules.minselectable} ${msg3}`;
        });
    }

    get undervoted(): boolean {
        if (this.contest.rules.voting === 'simple') {
            return this.selection.selectedCount < this.contest.rules.minselectable;
        } else if (this.contest.rules.voting === 'ranked-choice') {

            // Optional Preferential ranked choice voting has a special snowflake message
            if (this.contest.rules.minselectable < this.contest.rules.advancing) {
                this.undervoteWarning = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'undervotewarning_optionalpreferential');
                return this.selection.selectedCount < this.contest.rules.advancing;
            }
        }
        return this.selection.selectedCount === 0;
    }

    get emptyWriteIn(): boolean {
        if (this.writeInSelection) {
            const writeIn = this.writeInSelection.choice.trim();
            return !writeIn;
        }

        return true;
    }

    get informal(): boolean {
        return this.selection.selectedCount !== 0 && // Blank ballots are not necessarily informal
            this.contest.rules.voting === 'ranked-choice' &&
            this.selection.selectedCount < this.contest.rules.minselectable;
    }

    logChange() {
        this._eventLoggerService.info('UI_WEB_CHANGE_VOTE', 'User went back to change vote.');
    }
}
