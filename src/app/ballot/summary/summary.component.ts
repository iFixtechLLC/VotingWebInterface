import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Ballot, Contest, Vote } from '../../core';
import { AccessibilityService, BallotService, ConfigService, DictionaryService } from '../../shared';

@Component({
    selector: 'ballot-view.summary',
    templateUrl: 'summary.component.html',
    styleUrls: [
        'summary.component.scss',
        'summary.component.hc.scss'
    ]
})
export class SummaryComponent implements OnInit {
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };
    private get SUMMARY_PREFIX(): string { return this._config.get('summaryPrefix'); };

    ballot: Ballot;
    blackout: boolean;
    blackoutMessage: Observable<string>;
    contestCount: number;
    contests: Contest[];
    endOfList: Observable<string>;
    hideAll: string;
    message: Observable<string>;
    review: Observable<string>;
    showAll: string;
    title: Observable<string>;
    vote: Vote;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _ballotService: BallotService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService
    ) { }

    ngOnInit() {
        this.ballot = this._ballotService.ballot;

        this.title = this._dictionaryService.getValue(this.SUMMARY_PREFIX, 'title');
        this.message = this._dictionaryService.getValue(this.SUMMARY_PREFIX, 'message');
        this.review = this._dictionaryService.getValue(this.SUMMARY_PREFIX, 'review');
        this.endOfList = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'endoflist');
        this.blackoutMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'blackoutmessage');

        this.contests = this._contestsWithChoices();
        this.contestCount = this.contests.length;

        this.blackout = this._accessibilityService.current.blackout;
    }

    getIndex(contest: Contest): number {
        return this.ballot.contests.indexOf(contest);
    }

    private _contestsWithChoices(): Contest[] {
        const contests: Contest[] = [];

        this.ballot.contests.forEach((contest, index) => {
            if (contest.choices && contest.choices.length > 0) {
                contests.push(contest);
            }
        });

        return contests;
    }
}
