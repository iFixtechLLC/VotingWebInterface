import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Observable } from 'rxjs/Observable';

import { DialogLevels } from './dialog-levels';

@Component({
    selector: 'elect-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [
        './dialog.component.scss',
        './dialog.component.hc.scss'
    ]
})
export class DialogComponent implements OnInit {
    cancelText: Observable<string>;
    confirmText: Observable<string>;
    content: Observable<string>;
    isPrompt: boolean;
    level: string;  // 'warning' and 'error' change the dialog color
    title: Observable<string>;

    constructor(
        private _dialogInstance: NgbActiveModal
    ) { }

    ngOnInit() {
        this._validateLevel();
    }

    cancel() {
        this._dialogInstance.dismiss();
    }

    confirm() {
        this._dialogInstance.close();
    }

    private _validateLevel() {
        if (!this.level) {
            return;
        }

        if (!DialogLevels.isValid(this.level)) {
            this.level = '';
        }
    }

}
