import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, ConfigService, DialogLevels,
        DialogService, DictionaryService, LoadingService, UserService } from '../../shared';

@Component({
    selector: 'settings-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: [
        './top-menu.component.scss',
        './top-menu.component.hc.scss'
    ]
})
export class TopMenuComponent implements OnInit {
    private get SETTINGS_PREFIX(): string { return this._config.get('settingsPrefix'); };
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };

    header: Observable<string>;
    textSize: Observable<string>;
    contrast: Observable<string>;
    blackout: Observable<string>;
    resetAll: Observable<string>;
    loggedIn: boolean;
    logoutButton: Observable<string>;
    logoutTitle: Observable<string>;
    logoutMessage: Observable<string>;
    logoutAccept: Observable<string>;
    logoutCancel: Observable<string>;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _config: ConfigService,
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _userService: UserService,
        private _loading: LoadingService
    ) { }

    ngOnInit() {
        this.header = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'header');
        this.textSize = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'textsize');
        this.contrast = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'contrast');
        this.blackout = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'blackout');
        this.resetAll = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'resetall');

        this.loggedIn = this._userService.isAuthenticated;
        if (this.loggedIn) {
            this.logoutButton = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logout');
            this.logoutTitle = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logouttitle');
            this.logoutMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logoutmessage');
            this.logoutAccept = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logoutaccept');
            this.logoutCancel = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'logoutcancel');
        }
    }

    resetSettings() {
        this._accessibilityService.reset();
    }

    logout() {
        this._dialogService.confirm(this.logoutTitle, this.logoutMessage, DialogLevels.INFO, this.logoutAccept, this.logoutCancel)
            .subscribe((result) => {
                if (result) {
                    this._loading.show();
                    this._userService.logout('/auth').subscribe(
                        () => { },
                        (error) => {
                            console.error(error);
                            this._loading.hide();
                        });
                }
            });
    }
}
