import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

import { Observable } from 'rxjs/Observable';

import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {
    static get levels(): { [ key: string ]: string } {
        return {
            INFO: '',
            WARNING: 'warning',
            ERROR: 'error'
        };
    };

    private _refs: NgbModalRef[] = [];

    constructor(
        private _dialog: NgbModal
    ) { }

    confirm(
        title: Observable<string>,
        message: Observable<string>,
        level?: string,
        confirmText?: Observable<string>,
        cancelText?: Observable<string>
    ): Observable<boolean> {
        const dialogRef = this._dialog.open(DialogComponent, {
            backdrop: 'static',
            container: '.view-container',
            keyboard: false,
            windowClass: 'elect-dialog'
        });

        this._refs.push(dialogRef);

        confirmText = confirmText || Observable.of('Yes');
        cancelText = cancelText || Observable.of('No');

        const instance = dialogRef.componentInstance;

        instance.level = level;
        instance.isPrompt = true;
        instance.title = title;
        instance.content = message;
        instance.confirmText = confirmText;
        instance.cancelText = cancelText;

        return new Observable((observer) => {
            dialogRef.result.then(() => {
                observer.next(true);
                observer.complete();
                this._removeRef(dialogRef);
            }, () => {
                observer.next(false);
                observer.complete();
                this._removeRef(dialogRef);
            });
        });
    };

    notify(
        title: Observable<string>,
        message: Observable<string>,
        level?: string,
        confirmText?: Observable<string>
    ): Observable<boolean> {
        const dialogRef = this._dialog.open(DialogComponent, {
            backdrop: 'static',
            container: '.view-container',
            keyboard: false,
            windowClass: 'elect-dialog'
        });

        this._refs.push(dialogRef);

        confirmText = confirmText || Observable.of('OK');

        const instance = dialogRef.componentInstance;

        instance.level = level;
        instance.isPrompt = false;
        instance.title = title;
        instance.content = message;
        instance.confirmText = confirmText;

        return new Observable((observer) => {
            dialogRef.result.then(() => {
                observer.next(false);
                observer.complete();
                this._removeRef(dialogRef);
            }, () => {
                observer.next(false);
                observer.complete();
                this._removeRef(dialogRef);
            });
        });
    }

    private _removeRef(ref: NgbModalRef) {
        const index = this._refs.indexOf(ref);
        if (index > -1) {
            this._refs.splice(index, 1);
        }
    }

    closeAllDialogs() {
        this._refs.forEach((ref) => {
            ref.dismiss();
        });

        this._refs.length = 0;
    }
}
