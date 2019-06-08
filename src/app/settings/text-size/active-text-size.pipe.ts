import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfigService, DictionaryService } from '../../shared';

@Pipe({
    name: 'activeTextSize'
})
export class ActiveTextSizePipe implements PipeTransform {
    private get SETTINGS_PREFIX(): string { return this._config.get('settingsPrefix'); };

    constructor(
        private _config: ConfigService,
        private _dictionaryService: DictionaryService
    ) {}

    transform(value: string): Observable<string> {
        switch (value) {
            case 'small':
                return this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'smalltext');
            case 'normal':
                return this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'normaltext');
            case 'large':
                return this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'largetext');
            case 'x-small':
                return this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'xsmalltext');
            case 'x-large':
                return this._dictionaryService.getValue(this.SETTINGS_PREFIX, 'xlargetext');
        }
    }
}
