import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishLast';

import { ConfigService } from './config/config.service';
import { ElectionService } from './election.service';
import { UserService } from './user.service';

@Injectable()
export class EventLoggerService {
    private get WITH_CREDENTIALS(): boolean { return this._config.get('withCredentials'); };
    private _eventMap: Observable<any>;
    private _eventsUrl: string;

    constructor(
        private _config: ConfigService,
        private _electionService: ElectionService,
        private _http: Http,
        private _userService: UserService
    ) {
        this._eventMap = this._http.get('assets/evs-events.json').map((res: Response) => {
            return res.json();
        }).publishLast().refCount();
        this._eventsUrl = this._config.get('eventsUrl');
    }

    log(level: string, key: string, content: string, metadata?: any) {
        this._eventMap.subscribe((eventMap: any) => {
            const body = this._formatEvent(level, key, content, metadata, eventMap);
            this._http.post(this._eventsUrl, body, { withCredentials: this.WITH_CREDENTIALS }).subscribe();
        });
    }

    debug(key: string, content: string, metadata?: string) {
        this.log('debug', key, content, metadata);
    }

    info(key: string, content: string, metadata?: string) {
        this.log('info', key, content, metadata);
    }

    notice(key: string, content: string, metadata?: string) {
        this.log('notice', key, content, metadata);
    }

    warn(key: string, content: string, metadata?: string) {
        this.log('warning', key, content, metadata);
    }

    warning(key: string, content: string, metadata?: string) {
        this.log('warning', key, content, metadata);
    }

    error(key: string, content: string, metadata?: string) {
        this.log('err', key, content, metadata);
    }

    err(key: string, content: string, metadata?: string) {
        this.log('err', key, content, metadata);
    }

    crit(key: string, content: string, metadata?: string) {
        this.log('crit', key, content, metadata);
    }

    alert(key: string, content: string, metadata?: string) {
        this.log('alert', key, content, metadata);
    }

    emerg(key: string, content: string, metadata?: string) {
        this.log('emerg', key, content, metadata);
    }

    _formatEvent(level: string, key: string, content: string, metadata = {}, eventMap: any) {
        const event = eventMap[key];
        return {
            timestamp: new Date().toISOString(),
            content: content || '',
            severity: level,
            code: event.code,
            key: event.key,
            entity: event.entity,
            domain: event.domain,
            source: 'voting-web-interface',
            metadata: metadata,
            election: this._electionService.period.electionid,
            voter: this._userService.voterId,
            period: this._electionService.period.id
        };
    }
}
