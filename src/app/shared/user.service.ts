import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';

import { ConfigService } from './config/config.service';
import { BallotService } from './ballot.service';
import { VoteService } from './vote.service';
import { Session } from '../core';

@Injectable()
export class UserService {
    private get WITH_CREDENTIALS(): boolean { return this._config.get('withCredentials'); };
    private get KEEPALIVE_INTERVAL(): number { return this._config.get('keepAliveInterval'); };

    private _isAuthenticated: boolean;
    private _keepAlive: any;
    private _voterId: string;

    constructor(
        private _ballotService: BallotService,
        private _voteService: VoteService,
        private _config: ConfigService,
        private _http: Http,
        private _router: Router
    ) {
        this._isAuthenticated = false;

        this._keepAlive = Observable.timer(this.KEEPALIVE_INTERVAL, this.KEEPALIVE_INTERVAL)
            .switchMap(() => this._http.get(this._config.get('sessionUrl'), { withCredentials: this.WITH_CREDENTIALS }));
        this._keepAlive.subscribe();
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get voterId(): string {
        return this._voterId;
    }

    getSession(): Observable<Session> {
        return this._http.get(this._config.get('sessionUrl'), { withCredentials: this.WITH_CREDENTIALS })
            .map((res) => {
                const session = res.json();
                this._voterId = session.voter;
                return session;
            });
    }

    login(credentials: { [credential: string]: string }): Observable<any> {
        const body = {
            credentials: []
        };

        for (const key in credentials) {
            if (credentials.hasOwnProperty(key)) {
                body.credentials.push({
                    id: key,
                    value: credentials[key]
                });
            }
        }

        return this._http.post(this._config.get('authUrl'), body, { withCredentials: this.WITH_CREDENTIALS })
            .map((res) => {
                if (res.ok) {
                    const responseBody = res.json();
                    if (responseBody && responseBody.data && responseBody.data.sessionKey) {
                        this._isAuthenticated = true;
                        this._voteService.sessionKey = responseBody.data.sessionKey;
                    }
                }

                return res;
            });
    }

    logout(destination: string, queryParams?: { [key: string]: string }): Observable<any> {
        const postLogout = () => {
            this._isAuthenticated = false;
            this._ballotService.clear();
            this._voteService.clear();
            this._router.navigate([ destination ], { queryParams });
        };

        return this._http.post(this._config.get('logoutUrl'), {}, { withCredentials: this.WITH_CREDENTIALS })
            .finally(postLogout);
    }
}
