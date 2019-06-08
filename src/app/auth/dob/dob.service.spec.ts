/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DobService } from './dob.service';

describe('Service: Dob', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DobService]
        });
    });

    it('should construct', inject([DobService], (service: DobService) => {
        expect(service).toBeTruthy();
    }));
});
