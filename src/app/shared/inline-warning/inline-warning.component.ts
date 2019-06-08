import { Component, Input } from '@angular/core';

@Component({
    selector: 'inline-warning',
    templateUrl: './inline-warning.component.html',
    styleUrls: [
        './inline-warning.component.scss',
        './inline-warning.component.hc.scss'
    ]
})
export class InlineWarningComponent {

    @Input()
    message: string;

    constructor() { }
}
