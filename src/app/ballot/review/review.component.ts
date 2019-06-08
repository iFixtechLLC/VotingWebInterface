import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

import { Ballot, Contest, ErrorMessages } from '../../core';
import { AccessibilityService, BallotService, ConfigService, DialogLevels, DialogService,
         DictionaryService, ElectionService, EventLoggerService, LoadingService, UserService, VoteService } from '../../shared';

@Component({
    selector: 'ballot-view.review',
    templateUrl: 'review.component.html',
    styleUrls: [
        'review.component.scss',
        'review.component.hc.scss'
    ]
})
export class ReviewComponent implements OnInit {
    private get REVIEW_PREFIX(): string { return this._config.get('reviewPrefix'); };
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };

    ballot: Ballot;
    blackout: boolean;
    blackoutMessage: Observable<string>;
    confirmAccept: Observable<string>;
    confirmCancel: Observable<string>;
    confirmMessage: Observable<string>;
    confirmTitle: Observable<string>;
    contests: Contest[];
    endOfList: Observable<string>;
    errorAccept: Observable<string>;
    errorMessage: Observable<string>;
    errorTitle: Observable<string>;
    message: Observable<string>;
    submit: Observable<string>;
    title: Observable<string>;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _ballotService: BallotService,
        private _config: ConfigService,
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _electionService: ElectionService,
        private _eventLoggerService: EventLoggerService,
        private _loading: LoadingService,
        private _router: Router,
        private _userService: UserService,
        private _voteService: VoteService
    ) { }

    ngOnInit() {
        this._eventLoggerService.info('UI_WEB_VIEW_SUMMARY_PAGE', 'User viewed the election summary page.');

        this.ballot = this._ballotService.ballot;
        this.contests = this._contestsWithChoices();

        this.message = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'message');
        this.submit = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'submit');
        this.title = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'title');

        this.confirmTitle = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'confirmtitle');
        this.confirmMessage = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'confirmmessage');
        this.confirmAccept = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'confirmaccept');
        this.confirmCancel = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'confirmcancel');

        this.errorTitle = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'errortitle');
        this.errorMessage = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'errormessage');
        this.errorAccept = this._dictionaryService.getValue(this.REVIEW_PREFIX, 'erroraccept');

        this.endOfList = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'endoflist');
        this.blackoutMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'blackoutmessage');

        this.blackout = this._accessibilityService.current.blackout;
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

    getIndex(contest: Contest): number {
        return this.ballot.contests.indexOf(contest);
    }

    submitVote() {
        const electionConfig = this._electionService.period.config;
        if (electionConfig && electionConfig['confirmSubmission'] === false) {
            this._submit();
        } else {
            this._dialogService.confirm(
                    this.confirmTitle, this.confirmMessage, DialogLevels.INFO, this.confirmAccept, this.confirmCancel)
                .subscribe(result => {
                    if (result) {
                        this._submit();
                    }
                });
        }
    }

    private _submit() {
        this._loading.show();
        this._eventLoggerService.info('UI_WEB_VOTE_SUBMISSION_ATTEMPT', 'User attempted to submit a vote.');
        this._voteService.submit()
            .switchMap((res) => this._userService.logout('/finish'))
            .subscribe(null, (err) => {
                let body;
                try {
                    body = err.json();
                } catch (e) {
                    body = {};
                }

                const errorKey = ErrorMessages.submission(body.code);
                if (errorKey !== ErrorMessages.GENERIC) {
                    this._userService.logout('/finish', { error: errorKey }).subscribe();
                } else {
                    this._loading.hide();
                    console.log(err);
                    this._dialogService.notify(this.errorTitle, this.errorMessage, DialogLevels.ERROR, this.errorAccept);
                }
            });
    }
}
