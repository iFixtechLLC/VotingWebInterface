/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConverterService } from './converter.service';

describe('ConverterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConverterService]
        });
    });

    it('should construct', inject([ConverterService], (service: ConverterService) => {
        expect(service).toBeTruthy();
    }));

    describe('convert()', () => {
        it('should return html string when given markdown',
            inject([ConverterService], (service: ConverterService) => {
                const markdown = '__nice__ *one*';
                const expected = '<p><strong>nice</strong> <em>one</em></p>';

                const actual = service.convert(markdown);
                expect(actual).toEqual(expected);
            }));
    });
});
