/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ElectionService } from './election.service';
import { ConfigService } from './config/config.service';
import { MockConfigService } from './config/mock-config.service';
import { MockData } from '../../mock-data';

describe('ElectionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ElectionService,
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
                HttpModule
            ]
        });
    });

    it('should construct', inject([ElectionService, MockBackend], (service: ElectionService, backend: MockBackend) => {
        expect(service).toBeTruthy();
    }));

    describe('loadElectionPeriod()', () => {
        it('should return true for successful load and preserve the loaded data',
            inject([ElectionService, MockBackend], (service: ElectionService, backend: MockBackend) => {
                const options = {
                    status: 200,
                    body: {
                        data: MockData['period']
                    }
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });

                const result = service.loadElectionPeriod();

                result.subscribe((res) => {
                    expect(res).toEqual(true);
                    expect(service.period).toBeTruthy();
                });
            }));

        it('should return false for load failure',
            inject([ElectionService, MockBackend], (service: ElectionService, backend: MockBackend) => {
                const options = {
                    status: 500
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });

                const result = service.loadElectionPeriod();

                result.subscribe((res) => {
                    expect(res).toEqual(false);
                    expect(service.period).toBeFalsy();
                });
            }));
    });
});

