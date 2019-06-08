import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';
import { Response, ResponseOptions, Headers } from '@angular/http';

import { AccessibilityService, ConfigService, DictionaryService, LoadingService } from './shared';
import { AccessibilitySettings } from './core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss'
    ]
})
export class AppComponent implements OnInit {
    private get ELECTION_PREFIX(): string { return this._config.get('electionPrefix'); };

    constructor(
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _accessibilityService: AccessibilityService,
        private _loadingService: LoadingService,
        @Inject(DOCUMENT) private _document: any,
        private _title: Title
    ) {}

    ngOnInit() {
        this._dictionaryService.loaded.subscribe(next => {
            if (next) {
                this._dictionaryService.getValue(this.ELECTION_PREFIX, 'icon').subscribe((faviconUrl: string) => {
                    this._setFavicon(faviconUrl);
                });

                this._dictionaryService.getValue(this.ELECTION_PREFIX, 'title').subscribe((title: string) => {
                    this._title.setTitle(title);
                });
            }
        });

        this._updateAccessibility(this._accessibilityService.current);

        this._accessibilityService.changes.subscribe(next => {
            if (next) {
                this._updateAccessibility(next);
            }
        });

        this._loadingService.changes.subscribe(next => {
            this._updateLoading(next);
        });
    }

    private _setFavicon(url: string) {
        const favicon = this._document.getElementById('favicon');
        if (favicon) {
            favicon.href = url;
        }
    }

    private _updateAccessibility(settings: AccessibilitySettings) {
        const docClasses: DOMTokenList = this._document.documentElement.classList;

        docClasses.remove('x-small-text');
        docClasses.remove('small-text');
        docClasses.remove('large-text');
        docClasses.remove('x-large-text');
        docClasses.remove('high-contrast');
        docClasses.remove('inverted-contrast');

        if (settings.textSize === 'small') {
            docClasses.add('small-text');
        } else if (settings.textSize === 'large') {
            docClasses.add('large-text');
        } else if (settings.textSize === 'x-small') {
            docClasses.add('x-small-text');
        } else if (settings.textSize === 'x-large') {
            docClasses.add('x-large-text');
        }

        if (settings.contrast === 'high') {
            docClasses.add('high-contrast');
        } else if (settings.contrast === 'inverted') {
            docClasses.add('inverted-contrast');
        }
    }

    private _updateLoading(active: boolean) {
        const docClasses: DOMTokenList = this._document.documentElement.classList;

        const isActive = docClasses.contains('loading');

        if (active && !isActive) {
            docClasses.add('loading');
            docClasses.add('loading-enter');
            setTimeout(() => {
                docClasses.remove('loading-enter');
            });
        } else if (!active && isActive) {
            docClasses.add('loading-leave');

            setTimeout(() => {
                docClasses.remove('loading');
                docClasses.remove('loading-leave');
            }, 300);
        }
    }
}
