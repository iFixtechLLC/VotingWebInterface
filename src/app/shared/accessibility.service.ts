import { Injectable, EventEmitter } from '@angular/core';

import { AccessibilitySettings } from '../core';

@Injectable()
export class AccessibilityService {
    private _blackout: boolean;
    private _contrast: string;
    private _contrasts: string[] = [
        'normal',
        'high',
        'inverted'
    ];
    private _textSize: string;
    private _textSizes: string[] = [
        'small',
        'normal',
        'large',
        'x-small',
        'x-large'
    ];

    changes: EventEmitter<AccessibilitySettings> = new EventEmitter<AccessibilitySettings>();

    constructor() {
        this.reset();
    }

    private _textSizeIsValid(size: string) {
        return this._textSizes.indexOf(size) > -1;
    }

    private _contrastIsValid(contrast: string) {
        return this._contrasts.indexOf(contrast) > -1;
    }

    get current(): AccessibilitySettings {
        return {
            textSize: this._textSize,
            contrast: this._contrast,
            blackout: this._blackout
        };
    }

    get defaults(): AccessibilitySettings {
        return {
            textSize: 'normal',
            contrast: 'normal',
            blackout: false
        };
    }

    reset() {
        const defaults = this.defaults;
        this._textSize = defaults.textSize;
        this._contrast = defaults.contrast;
        this._blackout = defaults.blackout;

        this.changes.emit(defaults);
    }

    setBlackout(blackout: boolean) {
        this._blackout = blackout;

        this.changes.emit(this.current);
    }

    resetBlackout() {
        this._blackout = this.defaults.blackout;

        this.changes.emit(this.current);
    }

    setContrast(contrast: string) {
        if (this._contrastIsValid(contrast)) {
            this._contrast = contrast;

            this.changes.emit(this.current);
        }
    }

    resetContrast() {
        this._contrast = this.defaults.contrast;

        this.changes.emit(this.current);
    }

    setTextSize(textSize: string) {
        if (this._textSizeIsValid(textSize)) {
            this._textSize = textSize;

            this.changes.emit(this.current);
        }
    }

    resetTextSize() {
        this._textSize = this.defaults.textSize;

        this.changes.emit(this.current);
    }

}
