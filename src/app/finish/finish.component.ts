import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AccessibilityService, ConfigService, DictionaryService, LoadingService } from '../shared';

@Component({
    selector: 'elect-view.finish',
    templateUrl: './finish.component.html',
    styleUrls: [
        './finish.component.scss',
        './finish.component.hc.scss'
    ]
})
export class FinishComponent implements OnDestroy, OnInit {
    private get FINISH_PREFIX(): string { return this._config.get('finishPrefix'); };
    private get LOGOUT_MS(): number { return this._config.get('finishTimeout'); };

    private _timer: any;
    private _sub: any;

    message: Observable<string>;
    logoutText: Observable<string>;

    constructor(
        private _accessibilityService: AccessibilityService,
        private _config: ConfigService,
        private _dictionaryService: DictionaryService,
        private _loading: LoadingService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnDestroy() {
        this._cancelLogoutTimer();
        this._sub.unsubscribe();
    }

    ngOnInit() {
        this._loading.hide();

        this._sub = this._route.queryParams.subscribe(params => {
            if (params['error']) {
                this.message = this._dictionaryService.getValue(this.FINISH_PREFIX, 'errormessage', params['error']);
                this.logoutText = this._dictionaryService.getValue(this.FINISH_PREFIX, 'errorlogout');
            } else {
                this.message = this._dictionaryService.getValue(this.FINISH_PREFIX, 'message');
                this.logoutText = this._dictionaryService.getValue(this.FINISH_PREFIX, 'logout');
            }
        });

        this._startLogoutTimer();
    }

    logout() {
        this._accessibilityService.reset();
        this._router.navigate(['auth']);
    }

    private _cancelLogoutTimer() {
        if (this._timer !== undefined && this._timer !== null) {
            clearTimeout(this._timer);
        }
    }

    private _startLogoutTimer() {
        this._timer = setTimeout(() => {
            this.logout();
        }, this.LOGOUT_MS);
    }

}
