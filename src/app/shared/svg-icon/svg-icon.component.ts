import { Component, Input, ElementRef, OnChanges, SimpleChange } from '@angular/core';

import { SVGIconService } from './svg-icon.service';

@Component({
    selector: 'svg-icon',
    template: '',
    styleUrls: [
        'svg-icon.component.scss'
    ]
})
export class SVGIconComponent implements OnChanges {
    @Input()
    src: string;

    private _nativeEl: HTMLElement;

    constructor(
        private _el: ElementRef,
        private _svgIconService: SVGIconService
    ) {
        this._nativeEl = this._el.nativeElement;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        const srcChange = changes['src'];
        if (srcChange && srcChange.previousValue !== srcChange.currentValue) {
            this._svgIconService.injectElement(srcChange.currentValue, this._nativeEl);
        }
    }
}
