import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import { ConfigService, DialogService, DialogLevels, DictionaryService,
        ElectionService, LoadingService, UserService, TimeoutService } from '../../shared';

import { InputControlService, InputBase } from '../input';
import { ElectionWindow, ElectionStatus, ErrorMessages } from '../../core';

@Component({
    selector: 'auth-view.basic',
    templateUrl: './basic-auth.component.html',
    styleUrls: [
        './basic-auth.component.scss',
        './basic-auth.component.hc.scss'
    ],
    animations: [
        trigger('tooEarly', [
            transition(':leave', [
                style({ opacity: 1 }),
                animate(250, style({ opacity: 0 }))
            ])
        ]),
        trigger('loginForm', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(250, style({ opacity: 1 }))
            ])
        ])
    ]
})
export class BasicAuthComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChildren('authInput') vc: QueryList<any>;

    private get AUTH_PREFIX(): string { return this._config.get('authPrefix'); };
    private get ELECTION_PREFIX(): string { return this._config.get('electionPrefix'); };

    private _routeSub: any;

    electionLogo: Observable<string>;
    electionStatus: number;
    electionTitle: Observable<string>;
    errorAccept: Observable<string>;
    credentials: FormGroup;
    helpShowing: string;
    inputs: InputBase<any>[];
    inputText: {}[] = [];
    openTime: Date;
    poweredBySrc: Observable<string>;
    preMessage: Observable<string>;
    submitText: Observable<string>;
    tooEarly: Observable<string>;
    tooLate: Observable<string>;
    resume: boolean;
    resumeMessage: Observable<string>;
    windows: ElectionWindow[];

    constructor(
        private _config: ConfigService,
        private _dialogService: DialogService,
        private _dictionaryService: DictionaryService,
        private _electionService: ElectionService,
        private _inputControlService: InputControlService,
        private _userService: UserService,
        private _loadingService: LoadingService,
        private _timeoutService: TimeoutService,
        private _loading: LoadingService,
        private _router: Router,
        private _route: ActivatedRoute,
        @Inject(DOCUMENT) private _document: any,
    ) { }

    ngAfterViewInit() {
        this.resetForm();
    }

    ngOnInit() {
        this.electionTitle = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'title');
        this.electionLogo = this._dictionaryService.getValue(this.ELECTION_PREFIX, 'logo');

        const period = this._electionService.period;
        this.windows = period.windows;
        this.electionStatus = this.getElectionStatus();

        if (this.electionStatus === ElectionStatus.Early) {
            this.openTime = new Date(this.windows[0].open);
            const timer = Observable.timer(5000, 5000);
            const subscription = timer.subscribe(() => {
                this.electionStatus = this.getElectionStatus();
                if (this.electionStatus !== ElectionStatus.Early) {
                    subscription.unsubscribe();
                }
            });
        }

        this.inputs = this._inputControlService.toInputs(period.auth.credentials);
        this.credentials = this._inputControlService.toFormGroup(this.inputs);

        this.inputs.forEach((input) => {
            this.inputText.push(this._getInputText(input.key));
        });

        this.poweredBySrc = this._dictionaryService.getValue(this.AUTH_PREFIX, 'poweredbysrc');
        this.preMessage = this._dictionaryService.getValue(this.AUTH_PREFIX, 'pre');
        this.submitText = this._dictionaryService.getValue(this.AUTH_PREFIX, 'submit');
        this.errorAccept = this._dictionaryService.getValue(this.AUTH_PREFIX, 'erroraccept');
        this.tooEarly = this._dictionaryService.getValue(this.AUTH_PREFIX, 'early');
        this.tooLate = this._dictionaryService.getValue(this.AUTH_PREFIX, 'late');
        this.resumeMessage = this._dictionaryService.getValue(this.AUTH_PREFIX, 'resume');

        this._routeSub = this._route.queryParams.subscribe((params) => {
            if (params['resume'] === 'true') {
                this.resume = true;
                this._timeoutService.start();
            } else {
                this.resume = false;
                this._timeoutService.stop();
            }

            this._loading.hide();
        });
    }

    ngOnDestroy() {
        this._timeoutService.stop();

        if (this._routeSub) {
            this._routeSub.unsubscribe();
        }
    }

    private _getInputText(key: string): {} {
        const text: {} = {
            label: this._dictionaryService.getValue(this.AUTH_PREFIX, 'label', key),
            placeholder: this._dictionaryService.getValue(this.AUTH_PREFIX, 'placeholder', key),
            help: this._dictionaryService.getValue(this.AUTH_PREFIX, 'help', key)
        };

        return text;
    }

    get canSubmit(): boolean {
        return this.credentials.valid;
    }

    isValid(controlName: string): boolean {
        const control = this.credentials.controls[controlName];
        return control.valid && control.dirty;
    }

    onSubmit() {
        if (this.canSubmit) {
            this._document.activeElement.blur();
            this._loadingService.show();
            this._userService.login(this.credentials.value).subscribe(
                () => this._router.navigate(['ballot'], { replaceUrl: true }),
                (err) => {
                    this._loadingService.hide();

                    let body;
                    try {
                        body = err.json();
                    } catch (e) {
                        body = {};
                    }
                    const errorKey = ErrorMessages.authentication(body.code);
                    const errorTitle = this._dictionaryService.getValue(this.AUTH_PREFIX, 'errortitle', errorKey);
                    const errorMessage = this._dictionaryService.getValue(this.AUTH_PREFIX, 'errormessage', errorKey);

                    this._dialogService.notify(
                            errorTitle,
                            errorMessage,
                            DialogLevels.WARNING,
                            this.errorAccept
                        ).subscribe(() => {
                            this.resetForm();
                        });
                }
            );
        }
    }

    resetForm() {
        if (this.electionStatus === ElectionStatus.Open) {
            this.credentials.reset();
            setTimeout(() => {
                this.vc.first.nativeElement.focus();
            });
        }
    }

    toggleHelp(field: string) {
        if (this.helpShowing === field) {
            this.helpShowing = null;
        } else {
            this.helpShowing = field;
        }
    }

    getElectionStatus(): number {
        const currentTime = new Date().getTime();

        if (!this.windows || this.windows.length === 0) {
            return ElectionStatus.Open;
        }

        const win = this.windows[0];
        const openTime = win.open ? new Date(win.open).getTime() : 0;
        const closeTime = win.close ? new Date(win.close).getTime() : Infinity;

        if (currentTime < openTime) {
            return ElectionStatus.Early;
        } else if (currentTime > closeTime) {
            return ElectionStatus.Late;
        }

        return  ElectionStatus.Open;
    }
}
