/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { ElectionService } from './election.service';
import { VoteService } from './vote.service';
import { BallotService } from './ballot.service';
import { ConfigService } from './config/config.service';
import { CryptoService } from './crypto/crypto.service';
import { MockConfigService } from './config/mock-config.service';
import { UserService } from './user.service';
import { WindowRef } from './window-ref';

import { Vote } from '../core';

describe('VoteService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VoteService,
                CryptoService,
                WindowRef,
                ElectionService,
                UserService,
                BallotService,
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
                },

            ],
            imports: [
                HttpModule,
                RouterTestingModule.withRoutes([])
            ]
        });
    });

    it('should construct', inject([VoteService, MockBackend], (service: VoteService, backend: MockBackend) => {
        expect(service).toBeTruthy();
    }));

});
