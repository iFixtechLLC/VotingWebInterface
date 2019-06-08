/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BallotService } from './ballot.service';
import { ConfigService, MockConfigService, VoteService, WindowRef, CryptoService, ElectionService } from '../shared';
import { MockData } from '../../mock-data';

describe('BallotService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
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
                VoteService,
                CryptoService,
                ElectionService,
                WindowRef
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should construct', inject([BallotService, MockBackend], (service: BallotService, backend: MockBackend) => {
        expect(service).toBeTruthy();
    }));

    describe('loadBallot()', () => {
        it('should return true for successful load and preserve the loaded data',
            inject([BallotService, VoteService, MockBackend], (service: BallotService, voteService: VoteService, backend: MockBackend) => {
                const options = {
                    status: 200,
                    body: {
                        data: MockData['ballot']
                    }
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });
                voteService.sessionKey = 'MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQ=';
                const result = service.loadBallot();

                result.subscribe((res) => {
                    expect(res).toEqual(true);
                    expect(service.ballot).toBeTruthy();
                });
            }));

        it('should return false for load failure',
            inject([BallotService, VoteService, MockBackend], (service: BallotService, voteService: VoteService, backend: MockBackend) => {
                const options = {
                    status: 500
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });
                voteService.sessionKey = 'MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQ=';
                const result = service.loadBallot();

                result.subscribe((res) => {
                    expect(res).toEqual(false);
                    expect(service.ballot).toBeFalsy();
                });
            }));
    });

    describe('clear()', () => {
        it('should clear the ballot and votes',
        inject([BallotService, VoteService, MockBackend], (service: BallotService, voteService: VoteService, backend: MockBackend) => {
                const options = {
                    status: 200,
                    body: {
                        data: MockData['ballot']
                    }
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });
                voteService.sessionKey = 'MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQ=';
                const result = service.loadBallot();

                result.subscribe(() => {
                    service.clear();
                    expect(service.ballot).toBeNull();
                });
            }));
    });
});

