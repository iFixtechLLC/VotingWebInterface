import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ConfigService, DictionaryService, LoadingService, DialogService } from '../shared';
import { Locale } from '../core';
import { WindowRef } from '../shared/window-ref';

@Component({
    selector: 'elect-view.auth',
    templateUrl: './auth.component.html',
    styleUrls: [
        './auth.component.scss'
    ]
})
export class AuthComponent implements OnInit, OnDestroy {
    private get ELECTION_PREFIX(): string { return this._config.get('electionPrefix'); };
    private _routerSubscription: any;

    electionLogo: Observable<string>;
    electionTitle: Observable<string>;
    settings: Observable<string>;
    help: Observable<string>;
    languages: Locale[];
    returnPath: string;

    constructor(
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _dialogService: DialogService,
        private _loading: LoadingService,
        private _router: Router,
        private _window: WindowRef
    ) {
        this._routerSubscription = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                if (!this.isSettingsHelp(url)) {
                    this.returnPath = url;
                } else {
                    this.returnPath = this._extractReturnParam(url);
                }
            }
        });
    }

    ngOnInit() {
        this._loading.hide();

        this.electionLogo = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'logo');
        this.electionTitle = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'title');
        this.settings = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'settings');
        this.help = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'help');

        this.languages = this._dictionaryService.locales;
    }

    ngOnDestroy() {
        if (this._routerSubscription) {
            this._routerSubscription.unsubscribe();
        }
    }

    private _extractReturnParam(url): string {
        const match = ';from=';
        const index = url.indexOf(match);
        if (index > -1) {
            return decodeURIComponent(url.substring(index + match.length));
        }
        return '/auth';
    }

    changeLanguage(language: string) {
        this._dictionaryService.changeLanguage(language);
    }

    currentLanguage(): string {
        if (this._window.nativeWindow.innerWidth >= 825) {
            return this._dictionaryService.getLanguageName();
        } else {
            return this._dictionaryService.language;
        }
    }

    closeDialogs() {
        this._dialogService.closeAllDialogs();
    }

    isSettingsHelp(path: string): boolean {
        return path.indexOf('settings') > -1 || path.indexOf('help') > -1;
    }

    showLanguageMenu() {
        return this._dictionaryService.locales.length > 1;
    }
}
