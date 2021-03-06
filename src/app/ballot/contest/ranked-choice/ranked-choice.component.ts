import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Choice, Selection, ChoiceSelection } from '../../../core';
import { BallotService, ConfigService, DictionaryService, VoteService } from '../../../shared';

@Component({
    selector: 'ranked-choice',
    templateUrl: 'ranked-choice.component.html',
    styleUrls: [
        'ranked-choice.component.scss',
        'ranked-choice.component.hc.scss'
    ]
})
export class RankedChoiceComponent implements OnChanges, OnInit {
    private get CHOICE_PREFIX(): string { return this._config.get('choicePrefix'); };

    activeSrc: string;

    @Input()
    choice: Choice;

    @Input()
    contestIndex: number;

    description: Observable<string>;
    details: Observable<string>;
    group: Observable<string>;
    inactiveSrc: string;

    imgSrc: Observable<string>;

    @Input()
    index: number;

    @Input()
    limit: number;

    moreInfo: Observable<string>;

    selection: Selection;
    choiceSelection: ChoiceSelection;

    @Output()
    showDetails: EventEmitter<Choice> = new EventEmitter<Choice>();

    title: Observable<string>;

    constructor(
        private _config: ConfigService,
        private _ballotService: BallotService,
        private _dictionaryService: DictionaryService,
        private _voteService: VoteService
    ) {}

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        const choiceChange = changes['choice'];
        if (choiceChange && choiceChange.currentValue) {
            this.description = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'desc', choiceChange.currentValue.id);
            this.title = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'title', choiceChange.currentValue.id);
            this.group = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'group', choiceChange.currentValue.id);
            this.imgSrc = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'image', choiceChange.currentValue.id);
            this.details = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'details', choiceChange.currentValue.id);

            this.selection = this._voteService.getSelection(this.contestIndex);
            this.choiceSelection = this._voteService.getChoiceSelection(this.contestIndex, this.index);
        }
    }

    ngOnInit() {
        this.moreInfo = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'moreinfo');
        this.inactiveSrc = 'assets/icons/selection/check-inactive.svg';
    }

    emitShowDetails() {
        this.showDetails.emit(this.choice);
    }

    get iconSrc(): string {
        return this.isSelected ? this.activeSrc : this.inactiveSrc;
    }

    get isDisabled(): boolean {
        if (!this.selection || this.isSelected) {
            return false;
        }

        return this.selection.selectedCount >= this.limit;
    }

    get isSelected(): boolean {
        return this._voteService.isSelected(this.contestIndex, this.index);
    }

    rank() {
        this._voteService.rank(this.contestIndex, this.index);
    }

    get canShowDetails(): Observable<boolean> {
        return Observable.zip(this.details, this.moreInfo, (details, moreInfo) => {
          return !!details && !!moreInfo;
        });
    }
}
