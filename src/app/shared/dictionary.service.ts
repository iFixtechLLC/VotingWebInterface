import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ConfigService } from './config/config.service';
import { Dictionary, Locale } from '../core';

@Injectable()
export class DictionaryService {
    private _dictionary: Dictionary;
    private _language: string;
    private _locales: Locale[];
    private _subject: BehaviorSubject<Dictionary>;

    private get WITH_CREDENTIALS(): boolean { return this._config.get('withCredentials'); };
    loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _config: ConfigService,
        private _http: Http
    ) {
        this._language = this._config.get('defaultLanguage');
    }

    loadDictionary(addFlag?: boolean): Observable<boolean> {
        if (this._dictionary && this._dictionary.locale === this._language) {
            return Observable.of(true);
        }

        const dictionaryUrl = this._config.get('dictionaryUrl');

        const url = `${dictionaryUrl}/${this._language}${addFlag ? '?all=true' : ''}`;

        return this._http.get(url, { withCredentials: this.WITH_CREDENTIALS })
            .map((res) => this._parseResponse(res));
    }

    loadLocales(): Observable<boolean> {
        if (this._locales) {
            return Observable.of(true);
        }

        const localeUrl = this._config.get('localeUrl');

        return this._http.get(localeUrl, { withCredentials: this.WITH_CREDENTIALS })
            .map((res) => this._parseLocales(res));
    }

    get language(): string {
        return this._language;
    }

    get locales(): Locale[] {
        return this._locales;
    }

    reloadDictionary(): Observable<boolean> {
        this._dictionary = null;

        // Since we've already loaded an incomplete dictionary, we need to provide a
        // flag on the next call to avoid loading old data from the cache
        return this.loadDictionary(true);
    }

    changeLanguage(language: string, all?: boolean) {
        this._language = language;
        this.loadDictionary(all).subscribe();
    }

    getLanguageName() {
        let name;
        for (let i = 0; i < this._locales.length; i++) {
            const locale = this._locales[i];
            if (locale.id === this._language) {
                name = locale.localizedname;
                break;
            }
        }
        return name;
    }

    getValue(prefix: string, key: string, id?: string): Observable<string> {
        if (!this._dictionary) {
            return Observable.of('');
        }

        return this._subject.map((dictionary: Dictionary) => {
            return this._dictionary.getPrefixedValue(prefix, key, id);
        });
    }

    private _parseLocales(res: Response): boolean {
        if (!res.ok) {
            return false;
        }

        const body = res.json();
        if (!body.languages) {
            return false;
        }

        this._locales = [];
        for (const id in body.languages) {
            if (body.languages.hasOwnProperty(id)) {
                this._locales.push({
                  id: id,
                  localizedname: body.languages[id].localizedname,
                  name: body.languages[id].name
                });
            }
        }

        this.loaded.emit(true);
        return true;
    }

    private _parseResponse(res: Response): boolean {
        if (!res.ok) {
            return false;
        }

        const body = res.json();
        if (!body.data || !body.data.entries) {
            return false;
        }

        this._dictionary = new Dictionary(body.data.locale_code, body.data.entries);
        if (!this._subject) {
            this._subject = new BehaviorSubject(this._dictionary);
        } else {
            this._subject.next(this._dictionary);
        }
        this.loaded.emit(true);
        return true;
    }
}
