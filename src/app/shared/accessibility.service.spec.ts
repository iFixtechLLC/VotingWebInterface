/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AccessibilityService } from './accessibility.service';

describe('Service: Accessibility', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AccessibilityService]
        });
    });

    it('should construct', inject([AccessibilityService], (service: AccessibilityService) => {
        expect(service).toBeTruthy();
    }));

  describe('reset()', () => {
    it('should reset the accessibility settings to their defaults',
        inject([AccessibilityService], (service: AccessibilityService) => {
            service.setBlackout(true);
            service.setContrast('high');
            service.setTextSize('large');

            service.reset();

            expect(service.current).toEqual(service.defaults);
        }));
  });

  describe('setContrast()', () => {
    it('should ignore invalid settings',
        inject([AccessibilityService], (service: AccessibilityService) => {
            service.setContrast('banana');

            expect(service.current.contrast).toEqual(service.defaults.contrast);
        }));
  });

  describe('setTextSize()', () => {
    it('should ignore invalid settings',
        inject([AccessibilityService], (service: AccessibilityService) => {
            service.setTextSize('green');

            expect(service.current.textSize).toEqual(service.defaults.textSize);
        }));
  });
});
