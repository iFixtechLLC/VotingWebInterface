import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ConverterService } from './converter.service';

@Component({
    selector: 'markdown',
    template: `
        <div class="markdown" [innerHTML]="html"></div>
    `,
    styleUrls: [
        'markdown.component.scss'
    ]
})
export class MarkdownComponent implements OnChanges {
    @Input()
    md: string;

    html: SafeHtml;

    constructor(
        private _converterService: ConverterService,
        private _sanitizer: DomSanitizer
    ) {}

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        const mdChange = changes['md'];
        if (mdChange && mdChange.previousValue !== mdChange.currentValue) {
            this._convertMarkdown();
        }
    }

    private _convertMarkdown() {
        if (this.md) {
            // TODO: Remove the bypass THE INSTANT CKEditor and inline styles
            // are removed from admin because this is potentially dangerous
            this.html = this._sanitizer.bypassSecurityTrustHtml(this._converterService.convert(this.md));
        }
    }
}
