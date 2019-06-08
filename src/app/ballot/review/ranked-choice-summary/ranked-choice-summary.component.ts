import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Choice, ChoiceSelection } from '../../../core';
import { DictionaryService } from '../../../shared';

@Component({
    selector: 'ranked-choice-summary',
    templateUrl: './ranked-choice-summary.component.html',
    styleUrls: [
        './ranked-choice-summary.component.scss'
    ]
})
export class RankedChoiceSummaryComponent implements OnChanges {
    private get CHOICE_PREFIX(): string { return 'choice'; };

    @Input()
    choice: Choice;

    @Input()
    selection: ChoiceSelection;

    title: Observable<string>;

    constructor(
        private _dictionaryService: DictionaryService
    ) { }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        const choiceChanges = changes['choice'];

        if (choiceChanges && choiceChanges.currentValue) {
            this.title = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'title', this.choice.id);
        }
    }

}
