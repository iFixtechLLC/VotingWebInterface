import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { ConfigService } from './config/config.service';
import { DialogLevels } from './dialog/dialog-levels';
import { DialogService } from './dialog/dialog.service';
import { DictionaryService } from './dictionary.service';
import { ElectionService } from './election.service';
import { EventLoggerService } from './event-logger.service';
import { LoadingService } from './loading.service';
import { UserService } from './user.service';
import { WindowRef } from './window-ref';

@Injectable()
export class TimeoutService {
    private get DEFAULT_TIMEOUT(): number { return this._config.get('defaultSessionTimeout'); };
    private get DIALOG_TIMEOUT(): number { return this._config.get('sessionDialogTimeout'); };
    private get STATUS_INTERAL(): number { return this._config.get('statusInterval'); };
    private get STATUS_WARNING(): number { return this._config.get('statusWarning'); };

    private get BALLOT_PREFIX(): string { return this._config.get('ballotPrefix'); };

    private _stage1Sub;
    private _stage1Timer;
    private _resetStage1;
    private _stage2Sub;
    private _dialogSub;
    private _statusSub;

    constructor(
        private _config: ConfigService,
        private _datePipe: DatePipe,
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _electionService: ElectionService,
        private _eventLoggerService: EventLoggerService,
        private _loading: LoadingService,
        private _userService: UserService,
        private _window: WindowRef
    ) { }

    start() {
        this.stop();
        // Part 1: Inactivty Timeout

        let stage1Timeout = this._electionService.period.config['sessionexpire'];

        if (stage1Timeout) {
            stage1Timeout = parseInt(stage1Timeout, 10);
        } else {
            stage1Timeout = this.DEFAULT_TIMEOUT;
        }

        this._stage1Timer = Observable.timer(stage1Timeout * 60 * 1000);

        this._resetStage1 = debounce(() => {
            if (this._stage1Sub) {
                this._stage1Sub.unsubscribe();
                this._stage1Sub = this._stage1Timer.subscribe(stage1Handler);
            }
        }, 250, true);

        const stage2Timeout = this.DIALOG_TIMEOUT;
        const stage2Timer = Observable.timer(stage2Timeout * 60 * 1000);

        const resetStage2 = () => {
            if (this._stage2Sub) {
                this._stage2Sub.unsubscribe();
                this._stage1Sub = this._stage1Timer.subscribe(stage1Handler);
            }
        };

        const self = this;

        const timeoutTitle = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'timeouttitle');
        const timeoutMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'timeoutmessage');
        const timeoutAccept = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'timeoutaccept');

        function stage1Handler() {
            self._stage1Sub.unsubscribe();
            self._stage1Sub = null;
            self._stage2Sub = stage2Timer.subscribe(stage2Handler);

            self._dialogSub = self._dialogService.notify(
                    timeoutTitle,
                    timeoutMessage,
                    DialogLevels.WARNING,
                    timeoutAccept
                )
                .subscribe(resetStage2, resetStage2);
        }

        function stage2Handler() {
            if (self._dialogSub) {
                self._dialogSub.unsubscribe();
                self._dialogSub = null;
            }

            self._stage2Sub.unsubscribe();
            self._stage2Sub = null;

            self._loading.show();
            self._dialogService.closeAllDialogs();
            self._eventLoggerService.info('UI_WEB_SESSION_TIMEOUT', 'User session timed out.');
            self._userService.logout('/auth').subscribe();
        }

        this._stage1Sub = this._stage1Timer.subscribe(stage1Handler);
        this._window.nativeWindow.addEventListener('keydown', this._resetStage1);
        this._window.nativeWindow.addEventListener('mousemove', this._resetStage1);
        this._window.nativeWindow.addEventListener('click', this._resetStage1);

        // Part 2: Election Time Monitoring

        const statusTimer = Observable.timer(0, this.STATUS_INTERAL);
        let alreadyNotified = false;
        const closingTitle = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'closingtitle');
        let closingMessage = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'closingmessage');
        const closingAccept = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'closingaccept');
        const windows = this._electionService.period.windows;
        if (!windows || windows.length === 0) {
            return;
        }

        const win = windows[0];
        const closeTime = win.close ? new Date(win.close).getTime() : Infinity;
        const closeWarning = this.STATUS_WARNING * 60 * 1000;
        closingMessage = closeTime < Infinity ? closingMessage.map((message: string) => {
            return message + ` ${this._datePipe.transform(closeTime, 'shortTime')}.`;
        }) : Observable.of('');

        this._statusSub = statusTimer.subscribe(() => {
            const currentTime = new Date().getTime();

            if (currentTime >= closeTime) {
                this._statusSub.unsubscribe();
                this._loading.show();
                this._dialogService.closeAllDialogs();
                this._eventLoggerService.info('UI_WEB_SESSION_TIMEOUT', 'User session timed out.');
                this._userService.logout('/auth').subscribe();
            } else if (closeTime - currentTime < closeWarning && !alreadyNotified) {
                this._dialogService.notify(
                        closingTitle,
                        closingMessage,
                        DialogLevels.WARNING,
                        closingAccept
                    ).subscribe();
                alreadyNotified = true;
            }
        });
    }

    stop() {
        if (this._stage1Sub) {
            this._stage1Sub.unsubscribe();
        }

        if (this._stage2Sub) {
            this._stage2Sub.unsubscribe();
        }

        if (this._dialogSub) {
            this._dialogSub.unsubscribe();
        }

        if (this._statusSub) {
            this._statusSub.unsubscribe();
        }

        this._window.nativeWindow.removeEventListener('keydown', this._resetStage1);
        this._window.nativeWindow.removeEventListener('mousemove', this._resetStage1);
        this._window.nativeWindow.removeEventListener('click', this._resetStage1);
    }
}

// Port of Underscore's debounce function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout;

    return function() {
        const context = this, args = arguments;

        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
};
