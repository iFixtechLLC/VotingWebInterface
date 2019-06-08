/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { InputControlService } from './input-control.service';
import { ConfigService, MockConfigService, ElectionService } from '../../shared';
import { HttpModule } from '@angular/http';

describe('Service: Accessibility', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                InputControlService,
                ElectionService,
                {
                    provide: ConfigService,
                    useFactory: () => new MockConfigService()
                },
            ]
        });
    });

    it('should construct', inject([InputControlService], (service: InputControlService) => {
        expect(service).toBeTruthy();
    }));
});
