import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { BallotService, ConfigService, DialogService, DialogLevels,
        DictionaryService, LoadingService, TimeoutService, UserService, VoteService } from '../shared';
import { Election, Locale } from '../core';
import { WindowRef } from '../shared/window-ref';

@Component({
    selector: 'elect-view.ballot',
    templateUrl: './ballot.component.html',
    styleUrls: [
        './ballot.component.scss',
        './ballot.component.hc.scss'
    ]
})
export class BallotComponent implements OnInit, OnDestroy {
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };
    private get ELECTION_PREFIX(): string { return this._config.get('electionPrefix'); };
    private _routerSub1: any;
    private _routerSub2: any;

    election: Election;
    electionLogo: Observable<string>;
    electionTitle: Observable<string>;
    help: Observable<string>;
    languages: Locale[];
    logoutAccept: Observable<string>;
    logoutButton: Observable<string>;
    logoutCancel: Observable<string>;
    logoutMessage: Observable<string>;
    logoutTitle: Observable<string>;
    returnPath: string;
    summary: Observable<string>;
    settings: Observable<string>;

    constructor(
        private _config: ConfigService,
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _voteService: VoteService,
        private _loading: LoadingService,
        private _timeout: TimeoutService,
        private _userService: UserService,
        private _router: Router,
        private _window: WindowRef
    ) {
        this._routerSub1 = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                if (!this.isSettingsHelp(url)) {
                    this.returnPath = url;
                } else {
                    const extractedUrl = this._extractReturnParam(url);
                    this.returnPath = extractedUrl;
                }
            }
        });
    }

    ngOnInit() {
        this._routerSub2 = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                if (!this.isSettingsHelp(url)) {
                    this._voteService.updatePath(url);
                } else {
                    const extractedUrl = this._extractReturnParam(url);
                    this._voteService.updatePath(extractedUrl);
                }
            }
        });

        if (this._voteService.vote.path) {
            this._router.navigate([this._voteService.vote.path]);
        }

        this._loading.hide();

        this.electionLogo = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'logo');
        this.electionTitle = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'title');
        this.help = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'help');
        this.settings = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'settings');
        this.summary = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'summary');

        this.logoutButton = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logout');
        this.logoutTitle = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logouttitle');
        this.logoutMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logoutmessage');
        this.logoutAccept = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logoutaccept');
        this.logoutCancel = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logoutcancel');

        this.languages = this._dictionaryService.locales;

        this._timeout.start();
    }

    ngOnDestroy() {
        if (this._routerSub1) {
            this._routerSub1.unsubscribe();
        }

        if (this._routerSub2) {
            this._routerSub2.unsubscribe();
        }

        this._timeout.stop();
    }

    private _extractReturnParam(url): string {
        const match = ';from=';
        const index = url.indexOf(match);
        if (index > -1) {
            return decodeURIComponent(url.substring(index + match.length));
        }
        return '/ballot';
    }

    isSettingsHelp(path: string): boolean {
        return path.indexOf('settings') > -1 || path.indexOf('help') > -1;
    }

    closeDialogs() {
        this._dialogService.closeAllDialogs();
    }

    changeLanguage(language: string) {
        this._dictionaryService.changeLanguage(language, true);
    }

    currentLanguage(): string {
        if (this._window.nativeWindow.innerWidth >= 825) {
            return this._dictionaryService.getLanguageName();
        } else {
            return this._dictionaryService.language;
        }
    }

    logout() {
        this.closeDialogs();
        this._dialogService.confirm(this.logoutTitle, this.logoutMessage, DialogLevels.INFO, this.logoutAccept, this.logoutCancel)
            .subscribe((result) => {
                if (result) {
                    this._loading.show();
                    this._userService.logout('/auth').subscribe();
                }
            });
    }

    showLanguageMenu() {
        return this._dictionaryService.locales.length > 1;
    }
}
