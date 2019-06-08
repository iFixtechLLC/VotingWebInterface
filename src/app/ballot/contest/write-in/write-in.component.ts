import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BallotService, ConfigService, DictionaryService, VoteService } from '../../../shared';
import { ChoiceSelection, Selection } from '../../../core';

@Component({
    selector: 'contest-write-in',
    templateUrl: 'write-in.component.html',
    styleUrls: [
        'write-in.component.scss',
        'write-in.component.hc.scss'
    ]
})
export class WriteInComponent implements OnInit, OnChanges {
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };
    private get WRITE_IN_ID(): string { return this._config.get('writeInId'); };
    private get DEBOUNCE_DELAY(): number { return 1000; };
    private _debounceTimeout: any;

    activeSrc: string;
    inactiveSrc: string;

    @Input()
    limit: number;

    title: Observable<string>;

    @Input()
    contestIndex: number;

    selection: Selection;
    choiceSelection: ChoiceSelection;

    constructor(
        private _ballotService: BallotService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _voteService: VoteService
    ) {}

    ngOnInit() {
        this.title = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'writein');
        this.choiceSelection = this._voteService.getWriteInSelection(this.contestIndex);
        this.activeSrc = 'assets/icons/selection/check-active.svg';
        this.inactiveSrc = 'assets/icons/selection/check-inactive.svg';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['contestIndex']) {
            this.selection = this._voteService.getSelection(this.contestIndex);
            this.choiceSelection = this._voteService.getWriteInSelection(this.contestIndex);
        }
    }

    get iconSrc(): string {
        return this.isSelected ? this.activeSrc : this.inactiveSrc;
    }

    get isDisabled(): boolean {
        if (this.isSelected) {
            return false;
        }

        return this.selection.selectedCount >= this.limit;
    }

    get isSelected(): boolean {
        return this._voteService.writeInSelected(this.contestIndex);
    }

    toggleSelected(writeIn: any) {
        if (this.isSelected) {
            this._voteService.deselectWriteIn(this.contestIndex);
        } else {
            this._voteService.selectWriteIn(this.contestIndex);
            setTimeout(() => {
                writeIn.focus();
            });
        }
    }

    updateWriteIn(value) {
        this.choiceSelection.choice = value;
        clearTimeout(this._debounceTimeout);
        this._debounceTimeout = setTimeout(() => {
            this._voteService.save();
        }, this.DEBOUNCE_DELAY);
    }
}
