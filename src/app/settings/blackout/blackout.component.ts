import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, ConfigService, DictionaryService } from '../../shared';

@Component({
    selector: 'settings-blackout',
    templateUrl: './blackout.component.html',
    styleUrls: [
        './blackout.component.scss',
        './blackout.component.hc.scss'
    ]
})
export class BlackoutComponent implements OnInit {
    private get SETTINGS_PREFIX(): string { return this._config.get('settingsPrefix'); };

    back: Observable<string>;
    blackoutHelp: Observable<string>;
    blackoutStatus: Observable<string>;
    blackoutSub: Observable<string>;
    blackoutOn: Observable<string>;
    blackoutOff: Observable<string>;
    reset: Observable<string>;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService
    ) { }

    ngOnInit() {
        this.back = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'back');
        this.blackoutHelp = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'blackouthelp');
        this.blackoutStatus = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'blackoutstatus');
        this.blackoutSub = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'blackoutsub');
        this.blackoutOn = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'blackouton');
        this.blackoutOff = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'blackoutoff');
        this.reset = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'reset');
    }

    get blackoutActive(): boolean {
        return this._accessibilityService.current.blackout;
    }

    toggleBlackout() {
        this._accessibilityService.setBlackout(!this._accessibilityService.current.blackout);
    }

    resetBlackout() {
        this._accessibilityService.resetBlackout();
    }
}
