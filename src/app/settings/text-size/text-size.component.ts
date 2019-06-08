import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, ConfigService, DictionaryService } from '../../shared';

@Component({
    selector: 'app-text-size',
    templateUrl: './text-size.component.html',
    styleUrls: [
        './text-size.component.scss',
        './text-size.component.hc.scss'
    ]
})
export class TextSizeComponent implements OnInit {
    private get SETTINGS_PREFIX(): string { return this._config.get('settingsPrefix'); };

    back: Observable<string>;
    exampleTextTitle: Observable<string>;
    exampleText: Observable<string>;
    textSizeSub: Observable<string>;
    textSizeValue: number;
    reset: Observable<string>;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService
    ) { }

    ngOnInit() {
        this.back = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'back');
        this.exampleText = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'exampletext');
        this.exampleTextTitle = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'exampletexttitle');
        this.textSizeSub = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'textsizesub');
        this.reset = this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'reset');
    }


    get currentTextSize(): string {
        return this._accessibilityService.current.textSize;
    }

    setTextSize(textSize: string) {
        this._accessibilityService.setTextSize(textSize);
    }

    resetTextSize() {
        this._accessibilityService.resetTextSize();
    }
}
