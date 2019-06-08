import { Injectable } from '@angular/core';

import { Converter } from 'showdown';

@Injectable()
export class ConverterService {
    private _converter: Converter;

    constructor() {
        this._converter = new Converter();
    }

    convert(markdown: string): string {
        const unescaped = markdown.replace(/\\\\n/g, '\n');
        return this._converter.makeHtml(unescaped);
    }

}
