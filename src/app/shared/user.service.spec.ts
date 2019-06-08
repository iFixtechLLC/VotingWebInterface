/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { ConfigService } from './config/config.service';
import { MockConfigService } from './config/mock-config.service';
import { BallotService } from './ballot.service';
import { WindowRef } from './window-ref';
import { CryptoService } from './crypto/crypto.service';
import { ElectionService } from './election.service';
import { VoteService } from './vote.service';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BallotService,
                CryptoService,
                ElectionService,
                VoteService,
                UserService,
                WindowRef,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: ConfigService,
                    useFactory: () => new MockConfigService()
                }
            ],
            imports: [
                HttpModule,
                RouterTestingModule.withRoutes([])
            ]
        });
    });

    it('should construct', inject([UserService, MockBackend], (service: UserService, backend: MockBackend) => {
        expect(service).toBeTruthy();
    }));
});
