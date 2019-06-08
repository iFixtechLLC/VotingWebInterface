import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Contest, Selection } from '../../../core';
import { ConfigService, DictionaryService, VoteService } from '../../../shared';

@Component({
    selector: 'contest-summary',
    templateUrl: 'contest-summary.component.html',
    styleUrls: [
        'contest-summary.component.scss',
        'contest-summary.component.hc.scss'
    ]
})
export class ContestSummaryComponent implements OnChanges {
    private get CONTEST_PREFIX(): string { return this._config.get('contestPrefix'); };
    private get WRITE_IN_ID(): string { return this._config.get('writeInId'); };

    @Input()
    contest: Contest;

    selected: Observable<string>;
    title: Observable<string>;

    @Input()
    index: number;

    selection: Selection;

    constructor(
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _voteService: VoteService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        const contestChange = changes['contest'];

        if (contestChange && contestChange.currentValue) {
            const id: string = this.contest.id;
            this.title = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'title', id);
            this.selected = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'selected', id);
        }

        if (changes['index']) {
            this.selection = this._voteService.getSelection(this.index);
        }
    }

    get isDone(): boolean {
        return this.contest && this.selection &&
                this.contest.rules.maxselectable === this.selection.selectedCount;
    }

    get selectedCount(): number {
        return this.selection && this.selection.selectedCount;
    }
}
