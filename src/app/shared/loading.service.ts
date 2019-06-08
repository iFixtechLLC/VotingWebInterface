import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    private _current = true;

    changes: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    get current(): boolean {
        return this._current;
    }

    show() {
        this._current = true;
        this.changes.emit(this._current);
    }

    hide() {
        this._current = false;
        this.changes.emit(this._current);
    }
}
