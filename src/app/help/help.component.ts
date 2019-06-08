import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ConfigService, DictionaryService, ElectionService } from '../shared';

@Component({
    selector: 'ballot-view.help',
    templateUrl: 'help.component.html',
    styleUrls: [
        'help.component.scss',
        'help.component.hc.scss'
    ]
})
export class HelpComponent implements OnInit {
    private get HELP_PREFIX(): string { return this._config.get('helpPrefix'); };

    electionId: string;
    header: Observable<string>;
    periodExtref: string;
    periodId: string;
    text: Observable<string>;
    return: Observable<string>;
    returnPath: string;
    returnParams: { [key: string]: string };

    constructor(
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _electionService: ElectionService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit() {
        const fromUrl = this._route.snapshot.params['from'];
        if (fromUrl) {
            const path = decodeURIComponent(fromUrl);
            const segments = path.split('?');
            this.returnPath = segments.shift();
            this.returnParams = {};

            segments.forEach((segment) => {
                const kv = segment.split('=');
                this.returnParams[kv[0]] = kv[1];
            });
        }

        this.header = this._dictionaryService.getValue(this.HELP_PREFIX, 'header');
        this.text = this._dictionaryService.getValue(this.HELP_PREFIX, 'text');
        this.return = this.returnPath && this.returnPath.indexOf('auth') > -1 ?
                this._dictionaryService.getValue(this.HELP_PREFIX, 'authreturn') :
                this._dictionaryService.getValue(this.HELP_PREFIX, 'ballotreturn');

        this.electionId = this._electionService.period.electionid;
        this.periodId = this._electionService.period.id;
    }
}
