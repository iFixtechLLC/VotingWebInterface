/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DictionaryService } from './dictionary.service';
import { ConfigService } from './config/config.service';
import { MockConfigService } from './config/mock-config.service';
import { MockData } from '../../mock-data';

describe('DictionaryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DictionaryService,
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

    it('should construct', inject([DictionaryService, MockBackend], (service: DictionaryService, backend: MockBackend) => {
        expect(service).toBeTruthy();
    }));

    describe('loadDictionary()', () => {
        it('should return true for successful load and preserve the loaded data',
            inject([DictionaryService, MockBackend], (service: DictionaryService, backend: MockBackend) => {
                const options = {
                    status: 200,
                    body: {
                        data: MockData['dictionary']
                    }
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });

                const result = service.loadDictionary();

                result.subscribe((res) => {
                    expect(res).toEqual(true);
                    expect(service.getValue('election', 'title')).toBeTruthy();
                });
            }));

        it('should return false for load failure',
            inject([DictionaryService, MockBackend], (service: DictionaryService, backend: MockBackend) => {
                const options = {
                    status: 500
                };
                const response = new Response(new ResponseOptions(options));
                backend.connections.subscribe((connection) => {
                    connection.mockRespond(response);
                });

                const result = service.loadDictionary();

                result.subscribe((res) => {
                    expect(res).toBe(false);
                    service.getValue('election', 'title').subscribe(value => {
                        expect(value).toBeFalsy();
                    });
                });
            }));
    });
});
