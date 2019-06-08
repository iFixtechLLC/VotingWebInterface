import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DialogLevels, DialogService, DictionaryService, VoteService } from '../../shared';

import { ContestComponent } from './contest.component';

@Injectable()
export class ContestGuard implements CanDeactivate<ContestComponent> {
    private get BALLOT_PREFIX(): string { return 'ballot'; };

    constructor(
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _voteService: VoteService
    ) {}

    canDeactivate(
        component: ContestComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        const contest = component.contest;
        const selection = this._voteService.getSelection(component.contestIndex);

        // Only enforce rules that exist, and only if selections are made (i.e. not blank)
        if (!contest.config || !contest.choices || !contest.config['undervote'] || !selection ||
                selection.selectedCount >= contest.rules.minselectable || selection.selectedCount === 0 ||
                nextState.url.indexOf('settings') > -1 ||
                nextState.url.indexOf('help') > -1) {
            return true;
        }

        const level = contest.config['undervote'];
        let title, message, confirmText, cancelText;

        if (contest.rules.voting === 'ranked-choice') {
            title = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'informaltitle', level);
            const msg1 = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'informalmessage', level);
            const msg2 = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'informalmessage2', level);
            const msg3 = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'informalmessage3', level);

            message = Observable.zip(msg1, msg2, msg3, (m1, m2, m3) => {
              return `${m1} ${selection.selectedCount} ${m2} ${contest.rules.minselectable} ${m3}`;
            });
            confirmText = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'informalaccept', level);
            cancelText = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'informalcancel', level);
        } else if (contest.rules.voting === 'simple') {
            title = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'undervotetitle', level);
            message = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'undervotemessage', level);
            confirmText = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'undervoteaccept', level);
            cancelText = this._dictionaryService.getValue(this.BALLOT_PREFIX, 'undervotecancel', level);
        }

        if (level === 'warn') {
            return this._dialogService.confirm(title, message, DialogLevels.WARNING, confirmText, cancelText);
        } else if (level === 'disallow') {
            return this._dialogService.notify(title, message, DialogLevels.ERROR, confirmText);
        }

        return true;
    }
}
