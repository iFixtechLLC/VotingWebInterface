import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, ConfigService, DictionaryService } from '../shared';

@Component({
    selector: 'elect-settings',
    templateUrl: 'settings.component.html',
    styleUrls: [
        'settings.component.scss',
        'settings.component.hc.scss'
    ]
})
export class SettingsComponent implements OnInit {
    private get SETTINGS_PREFIX(): string { return this._config.get('settingsPrefix'); };
    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };

    return: Observable<string>;
    returnPath: string;
    returnParams: { [key: string]: string };

    constructor(
        private _accessibilityService: AccessibilityService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit() {
        const fromUrl = this._route.snapshot.params['from'];
        if (fromUrl) {
            const path = decodeURIComponent(fromUrl);
            const segments = path.split('?');
            this.returnPath = segments.shift();
            this.returnParams = {};

            segments.forEach((segment) => {
                const kv = segment.split('=');
                this.returnParams[kv[0]] = kv[1];
            });
        }

        this.return = this.returnPath && this.returnPath.indexOf('auth') > -1 ?
                this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'authreturn') :
                this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'ballotreturn');
    }
}
