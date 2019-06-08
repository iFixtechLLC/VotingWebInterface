import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService, DictionaryService, BallotService, ElectionService } from '../shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

@Injectable()
export class BallotGuard implements CanActivate {
    constructor(
        private _userService: UserService,
        private _dictionaryService: DictionaryService,
        private _ballotService: BallotService,
        private _electionService: ElectionService,
        private _router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this._userService.getSession()
            .retryWhen((errors) => {
                return errors.delay(5000);
            })
            .switchMap((session) => {
                if (!this._userService.isAuthenticated) {
                    const queryParams = {};
                    if (session.voter) {
                        queryParams['resume'] = true;
                    }

                    this._router.navigate(['/auth'], { queryParams });
                    return Observable.of(false);
                }

                return Observable.forkJoin<boolean>(
                    [
                        this._dictionaryService.reloadDictionary(),
                        this._dictionaryService.loadLocales(),
                        this._ballotService.loadBallot(),
                        this._electionService.loadElectionPeriod()
                    ],
                    (dictionaryLoaded, localesLoaded, ballotLoaded, electionLoaded) => {
                        return dictionaryLoaded && localesLoaded && ballotLoaded && electionLoaded;
                    }
                ).retryWhen((errors) => {
                    return errors.delay(5000);
                })
            });
    }
}
