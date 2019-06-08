/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SVGIconService } from './svg-icon.service';
import { WindowRef } from '../window-ref';

describe('SVGIconService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SVGIconService,
                WindowRef
            ]
        });
    });

    it('should construct', inject([SVGIconService], (service: SVGIconService) => {
        expect(service).toBeTruthy();
    }));
});
