import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Choice } from '../../../core';
import { DictionaryService } from '../../../shared';

@Component({
    selector: 'simple-choice-summary',
    templateUrl: './simple-choice-summary.component.html',
    styleUrls: [
        './simple-choice-summary.component.scss'
    ]
})
export class SimpleChoiceSummaryComponent implements OnChanges {
    private get CHOICE_PREFIX(): string { return 'choice'; };

    @Input()
    choice: Choice;

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
