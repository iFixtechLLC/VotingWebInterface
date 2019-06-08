import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';

import { DictionaryService, UserService } from '../shared';

@Injectable()
export class FinishGuard implements CanActivate {
    constructor(
        private _dictionaryService: DictionaryService,
        private _userService: UserService,
        private _router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this._userService.getSession()
            .retryWhen((errors) => {
                return errors.delay(5000);
            })
            .switchMap((session) => {
                if (session.ballotstyle || session.voter) {
                    this._router.navigate(['/ballot']);
                    return Observable.of(false);
                }

                return this._dictionaryService.loadDictionary()
                    .retryWhen((errors) => {
                        return errors.delay(5000);
                    });
            });
    }
}
