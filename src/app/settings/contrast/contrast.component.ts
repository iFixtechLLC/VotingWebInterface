import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, ConfigService, DictionaryService } from '../../shared';

@Component({
    selector: 'settings-contrast',
    templateUrl: './contrast.component.html',
    styleUrls: [
        './contrast.component.scss'
    ]
})
export class ContrastComponent implements OnInit {
    private get SETTINGS_PREFIX(): string { return this._config.get('settingsPrefix'); };

    back: Observable<string>;
    contrastSub: Observable<string>;
    normalContrast: Observable<string>;
    bowContrast: Observable<string>;
    wobContrast: Observable<string>;
    reset: Observable<string>;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService
    ) { }

    ngOnInit() {
        this.back = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'back');
        this.contrastSub = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'contrastsub');
        this.normalContrast = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'normalcontrast');
        this.bowContrast = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'bowcontrast');
        this.wobContrast = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'wobcontrast');
        this.reset = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'reset');
    }

    get activeContrast(): string {
        return this._accessibilityService.current.contrast;
    }

    setContrast(contrast: string) {
        this._accessibilityService.setContrast(contrast);
    }

    resetContrast() {
        this._accessibilityService.resetContrast();
    }
}
