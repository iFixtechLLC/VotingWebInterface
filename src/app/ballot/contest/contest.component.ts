import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, BallotService, ConfigService, DialogService,
         DialogLevels, DictionaryService, VoteService, WindowRef } from '../../shared';
import { Choice, Contest, Selection } from '../../core';

@Component({
    selector: 'ballot-view.contest',
    templateUrl: 'contest.component.html',
    styleUrls: [
        'contest.component.scss',
        'contest.component.hc.scss'
    ]
})
export class ContestComponent implements OnDestroy, OnInit {
    private get ELECTION_PREFIX(): string { return this._config.get('electionPrefix'); };
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };
    private get CHOICE_PREFIX(): string { return this._config.get('choicePrefix'); };
    private get CONTEST_PREFIX(): string { return this._config.get('contestPrefix'); };

    private _routeSub: any;

    blackout: boolean;
    blackoutMessage: Observable<string>;
    clear: Observable<string>;
    clearAccept: Observable<string>;
    clearCancel: Observable<string>;
    clearPrompt: Observable<string>;
    clearTitle: Observable<string>;
    contentPadding: number;
    contest: Contest;
    contestCount: number;
    contestIndex: number;
    details: Observable<string>;
    endOfList: Observable<string>;
    next: Observable<string>;
    nextRank: Observable<string>;
    postMessage: Observable<string>;
    preMessage: Observable<string>;
    previous: Observable<string>;
    rankComplete: Observable<string>;
    return: Observable<string>;
    selected: Observable<string>;
    selection: Selection;
    statusFixed: boolean;
    statusTop: number;
    subtitle: Observable<string>;
    title: Observable<string>;
    undo: Observable<string>;

    @ViewChild('ballotContent')
    ballotContentEl: ElementRef;

    @ViewChild('contestStatus')
    contestStatusEl: ElementRef;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _ballotService: BallotService,
        private _config: ConfigService,
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _voteService: VoteService,
        private _window: WindowRef
    ) { }

    ngOnDestroy() {
        this._routeSub.unsubscribe();
    }

    ngOnInit() {
        this.contestCount = this._ballotService.ballot.contests.length;

        this._routeSub = this._route.params.subscribe(next => {
            this.contestIndex = parseInt(next['contestIndex'], null);
            this._init();
        });

        this.endOfList = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'endoflist');
        this.blackoutMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'blackoutmessage');

        this.previous = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'viewback');
        this.next = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'viewnext');

        this.return = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'return');

        this.blackout = this._accessibilityService.current.blackout;
    }

    private _init() {
        this.contest = this._ballotService.getContest(this.contestIndex);
        this.selection = this._voteService.getSelection(this.contestIndex);

        this.title = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'title', this.contest.id);
        this.subtitle = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'subtitle', this.contest.id);
        this.preMessage = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'pre', this.contest.id);
        this.postMessage = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'post', this.contest.id);
        this.selected = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'selected', this.contest.id);

        this.nextRank = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'nextrank');
        this.rankComplete = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'rankcomplete');
        this.undo = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'undorank');
        this.clear = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'clearrank');

        this.clearTitle = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'clearranktitle');
        this.clearPrompt = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'clearrankmessage');
        this.clearAccept = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'clearrankaccept');
        this.clearCancel = this._dictionaryService.getValue(this.CONTEST_PREFIX, 'clearrankcancel');

        this.clearDetails();
        if (this.ballotContentEl) {
            this.ballotContentEl.nativeElement.scrollTop = 0;
        }
        this.handleScroll();
    }

    clearDetails() {
        this.details = null;
    }

    get contestComplete(): boolean {
        return this.contest && this.selection &&
                this.contest.rules.maxselectable === this.selection.selectedCount;
    }

    get nextLink(): any[] {
        if (this.contestIndex < this.contestCount - 1) {
            return ['/ballot', 'contest', this.contestIndex + 1];
        }
        return ['/ballot', 'review'];
    }

    showDetails(choice: Choice) {
        this.details = this._dictionaryService.getValue(this.CHOICE_PREFIX, 'details', choice.id);
    }

    undoRank() {
        this._voteService.undo(this.contestIndex);
    }

    clearRank() {
        this._dialogService.confirm(this.clearTitle, this.clearPrompt, DialogLevels.INFO, this.clearAccept, this.clearCancel)
            .subscribe((result) => {
                if (result) {
                    this._voteService.clearRank(this.contestIndex);
                }
            });
    }

    handleScroll() {
        if (this.contestStatusEl) {
            const cs = this.contestStatusEl.nativeElement;
            const bc = this.ballotContentEl.nativeElement;

            if (bc.scrollTop >= cs.offsetTop && !this.statusFixed) {
                this.statusFixed = true;
                this.statusTop = cs.offsetTop;
                const bcStyle = this._window.nativeWindow.getComputedStyle(bc);
                this.contentPadding = parseInt(bcStyle.paddingTop, 10);
                bc.style.paddingTop = `${cs.clientHeight + this.contentPadding}px`;
            } else if (bc.scrollTop < this.statusTop && this.statusFixed) {
                this.statusFixed = false;
                bc.style.paddingTop = null;
            }
        }
    }
}
