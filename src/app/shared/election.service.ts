import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Period } from '../core';
import { ConfigService } from './config/config.service';

@Injectable()
export class ElectionService {
    private _period: Period;
    private get WITH_CREDENTIALS(): boolean { return this._config.get('withCredentials'); };

    constructor(
        private _config: ConfigService,
        private _http: Http
    ) {}

    loadElectionPeriod(): Observable<boolean> {
        if (this._period) {
            return Observable.of(true);
        }

        return this._http.get(this._config.get('periodUrl'), { withCredentials: this.WITH_CREDENTIALS })
            .map((res) => this._parseResponse(res));
    }

    get period(): Period {
        return this._period;
    };

    private _parseResponse(res: Response): boolean {
        if (!res.ok) {
            return false;
        }

        const body = res.json();
        this._period = body.data;
        this._period.crypto.publickey = JSON.parse(body.data.crypto.publickey);
        return true;
    }
}
