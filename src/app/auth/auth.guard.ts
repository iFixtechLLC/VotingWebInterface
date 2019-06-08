import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

import { DictionaryService, ElectionService, UserService } from '../shared';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _dictionaryService: DictionaryService,
        private _electionService: ElectionService,
        private _router: Router,
        private _userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this._userService.getSession()
            .retryWhen((errors) => {
                return errors.delay(5000);
            })
            .switchMap(() => {
                if (this._userService.isAuthenticated) {
                    this._router.navigate(['/ballot']);
                    return Observable.of(false);
                }

                if (!route.queryParams['resume'] && this._userService.voterId) {
                    this._router.navigate(['/auth'], { queryParams: { resume: true }});
                    return Observable.of(false);
                }

                return Observable.forkJoin<boolean>(
                    [
                        this._dictionaryService.loadDictionary(),
                        this._dictionaryService.loadLocales(),
                        this._electionService.loadElectionPeriod()
                    ],
                    (dictionaryLoaded, localesLoaded, electionLoaded) => {
                        return dictionaryLoaded && localesLoaded && electionLoaded;
                    }
                ).retryWhen((errors) => {
                    return errors.delay(5000);
                });
            });
    }
}
