/* tslint:disable:no-unused-variable max-line-length */

import { TestBed, inject } from '@angular/core/testing';
import { CryptoService } from './crypto.service';
import { JSCrypto } from './js-crypto';
import { WebCrypto } from './web-crypto';
import { WindowRef } from '../window-ref';
import { Vote } from '../../core';

let publicJwk: JsonWebKey, privateJwk: JsonWebKey, vote: Vote;

describe('CryptoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CryptoService,
                WindowRef
            ]
        });
    });

    it('should construct', inject([CryptoService], (service: CryptoService) => {
        expect(service).toBeTruthy();
    }));

    describe('encrypt() and decrypt()', () => {
        it('should correctly encrypt/decrypt the test string', (done) => {
            inject([CryptoService], (service: CryptoService) => {
                const expected = '[{"choiceId":"03041efc-e9b7-47f6-a4f3-a7feefb3e86d","value":"0","writeIn":""},{"choiceId":"feb87d64-467d-45b1-b160-11a8849b4855","value":"1","writeIn":""},{"choiceId":"write_in","value":"0","writeIn":""}]';

                service.encrypt(expected, publicJwk).then((result) => {
                    service.decrypt(result, privateJwk).then((actual) => {
                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            })();
        });
    });

    describe('encryptProgress() and decryptProgress()', () => {
        it('should correctly encrypt/decrypt the vote object', (done) => {
            inject([CryptoService], (service: CryptoService) => {
                const expected = vote;

                const key = 'MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQ=';
                service.encryptProgress(expected, key).subscribe((encrypted) => {
                    service.decryptProgress(encrypted, key).subscribe((actual) => {
                        expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
                        done();
                    });
                });
            })();
        });
    });

    describe('JSCrypto and WebCrypto', () => {
        it('should produce the same results (JS encrypt, Web decrypt)', (done) => {
            inject([WindowRef], (windowRef: WindowRef) => {
                const win = windowRef.nativeWindow;

                if (!win.crypto || !win.crypto.subtle) {
                    done();
                    return;
                }

                const expected = '[{"choiceId":"03041efc-e9b7-47f6-a4f3-a7feefb3e86d","value":"0","writeIn":""},{"choiceId":"feb87d64-467d-45b1-b160-11a8849b4855","value":"1","writeIn":""},{"choiceId":"write_in","value":"0","writeIn":""}]';
                const jsCrypto = new JSCrypto();
                const webCrypto = new WebCrypto(win);

                jsCrypto.encrypt(expected, publicJwk).then((encrypted) => {
                    webCrypto.decrypt(encrypted, privateJwk).then((actual) => {
                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            })();
        });

        it('should produce the same results (Web encrypt, JS decrypt)', (done) => {
            inject([WindowRef], (windowRef: WindowRef) => {
                const win = windowRef.nativeWindow;

                if (!win.crypto || !win.crypto.subtle) {
                    done();
                    return;
                }

                const expected = '[{"choiceId":"03041efc-e9b7-47f6-a4f3-a7feefb3e86d","value":"0","writeIn":""},{"choiceId":"feb87d64-467d-45b1-b160-11a8849b4855","value":"1","writeIn":""},{"choiceId":"write_in","value":"0","writeIn":""}]';
                const jsCrypto = new JSCrypto();
                const webCrypto = new WebCrypto(win);

                webCrypto.encrypt(expected, publicJwk).then((encrypted) => {
                    jsCrypto.decrypt(encrypted, privateJwk).then((actual) => {
                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            })();
        });

        it('should produce the same results (Web progress encrypt, JS progress decrypt)', (done) => {
            inject([WindowRef], (windowRef: WindowRef) => {
                const win = windowRef.nativeWindow;

                if (!win.crypto || !win.crypto.subtle) {
                    done();
                    return;
                }

                const expected = JSON.stringify(vote);
                const jsCrypto = new JSCrypto();
                const webCrypto = new WebCrypto(win);

                const key = 'MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQ=';
                webCrypto.encryptProgress(expected, key).then((encrypted) => {
                    jsCrypto.decryptProgress(encrypted, key).then((actual) => {
                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            })();
        });

        it('should produce the same results (JS progress encrypt, Web progress decrypt)', (done) => {
            inject([WindowRef], (windowRef: WindowRef) => {
                const win = windowRef.nativeWindow;

                if (!win.crypto || !win.crypto.subtle) {
                    done();
                    return;
                }

                const expected = JSON.stringify(vote);
                const jsCrypto = new JSCrypto();
                const webCrypto = new WebCrypto(win);

                const key = 'MTIzNDEyMzQxMjM0MTIzNDEyMzQxMjM0MTIzNDEyMzQ=';
                jsCrypto.encryptProgress(expected, key).then((encrypted) => {
                    webCrypto.decryptProgress(encrypted, key).then((actual) => {
                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            })();
        });
    });
});

vote = {
    selections: [{
        contest: 'contest1',
        choiceData: {
            choices: [{
                choice: 'choice1',
                contest: 'contest1',
                weight: 0,
                writein: false
            },
            {
                choice: 'choice2',
                contest: 'contest1',
                weight: 1,
                writein: false
            }]
        },
        selectedCount: 1,
    }],
    path: ''
};

publicJwk = {
    // alg: 'RSA-OAEP-256',
    e: 'AQAB',
    ext: true,
    key_ops: ['encrypt'],
    kty: 'RSA',
    n: 'wll5PpC-7Oyv5hVzBaUrxXbjon3ZQ426bnSRbtmD1ktFVvkvmnspupG7BHs7fCpJ-nY-vjrug-iNW3YjtYoOPxXghqTFnoL9elqRFwPEGMgBbvZursG7R4oL4j-jRg-Dh2MY4irW5nw84ihjh0T_5SIvUSebYWevqKuPtt2npUIlkHvwAjAJUEYIpT6aiL_QxOuoWJGKf0Tt47XddC9FHXra1sHTaCPw8rVPWeR4sna4OyO868vk-eCd33ogpiI1CaoremSLsCkKMeaCWqLiEBY6bpdonEja8pYWUMTStNqIpZg0ndb1f3deukotFMa7hz3-oLX8R_xzIjUBy175OnUQbeUb2SC8bb6MU6pBWZOiVcWTcC03M3s4jHaoEUwxwT2i2v-ejDWDtO5xcuW3mVId2vmPHjRtgT0RnTNH9GzAV8DTcx7tP_XRcyK8uDfNvKV3lfANKIrRzGojEuobgNsxRZZ8nM_vxYnMVQLZN1SZg7ivBPibUQF3yAu9eGKReJUNIPIA-5EKZ2IQMW04YAiGiHyMtoejYZav1Aj3mCLRfetwdK6f9GlSLYHfk_LN3lhaRseblVJhELntkPc42q2so7ongzOJHCrl3SEdzvyclEW-AuODNb03-aDHj3hP-tTuYTTEZzwg5kgcsOisd_f8i8-ZMAkkPx6iI2YXPSc'
};

privateJwk = {
    // alg: 'RSA-OAEP-256',
    d: 'OSpyRFn1HuF719SlUZrE5j9TM7-KwZkVplm5UX6_ja_0RGHlg64Ily04clgBJkOWIQrY58GT2M71jVqRpFtoV1wK_-_FhRuIjY3IMZnU-2kRKt9nrRWlDaToW_NWBkyX5qHaduQc9AzFJ8yzgd1k27QTcO6SgLMr8xQLoMFQB4cOX5JlBW-1vZvr_RcOA31QXivnB64_q7HNu3YKHpus28AAUL0QfwhbXjjAj3NpoSzUgejAMCd4QZu1ND_LDLLxINeiFE0w3W8k5Yqk-x4AGrU_GLqGdbnkVQiapcVPKQ1Ctlqv12GcMpMdFPSuj_bowB4XIJSHEXGLOBuZXIWiDvGTR6NW_WS8KWb2IeDEOsT-9Y3uGQ45BABKgpHA_54QgOuurVGgODjDBy6Fw6X2YP_orFcE-ag2WK8fyz2ATMMBGBTxadqA3c8YKc3liRmsA5qAojeNLKn-vHlN4xqE9VkFErg1lhDVfyJoMAufqfPKVQylkMQAaOYTUAOU3O2jL4bWMp101Zj0rGpt0toDx9ER6l8jshycx_cr633r8NYFnGXNn3vvQitT8aKJg64M6pV_JuQdwGbY9UO5PUjZvcZ_Kmp1ZJeqc6YAs6ermcB0_EcyaYLvIP_l8H6I7nI1mbSrv1Tkbt9vcvWp9MlZTGTvWMn9kfc6cG8pfatJ1fE',
    dp: 'gxJDYii2uVXLBPix-zRl8x7Y9HebhRLLv-xMyDbgHjR1uyYFM6sdrlN5qw_DvDOQM1lUY2IuguFoB3mvyN-ZN2Yi9BWw_XnbgxXw6TT0QrPBdJcf_P5KUih2OZrHQWvD0ba_a9IFPRh_hF98JyVkAZXK-1eVnCeehE8BQ9_M9vjlhka2PVGfy0tGoj-vUOfV_mS_Uxym0Aifkk-pS7nO8DakYCetlLpYRTSMwKgiQdHvwmbgMvtu6OJTvBcDCNJUUAGI5in78Rhr9gYVfB9DAvF4_MBgVKSYW4i868xLus6lbwzZfDwsi3TESd7TlJX19KUNj2EqUPGYhnuBym562Q',
    dq: 'kr6d1GpUBmSxUkXOsGIzGWjbDdlBmJvjYCG2XTm4cqWXJlwuwDyh_9CPEE433GiNccjIpBFFt1icsdh5jd26S65TKAFDJqrWdiTgPtjpxBuwcHp6lBtkrbtPSFw0vaXPMhgKhClOhDxXtNf_MVGXKP-65P68U20hPzk7VHTjzEOQYsx5OTabjY4VReSxXmIwkS9VhmNJwpaKKXQ1Uvxzqw6psUxG1QoA7GEMVJ7X0BSWgjnEj6HkXC_TovKHUXLpxatOzXq0zJsQj6aN_OYSgrs5q1S2K6RZxIINffjcYTfV6tu5uvVZaHd-wKxdN_roVI8ybrkzXCmF_12gOberVw',
    e: 'AQAB',
    ext: true,
    key_ops: ['decrypt'],
    kty: 'RSA',
    n: 'wll5PpC-7Oyv5hVzBaUrxXbjon3ZQ426bnSRbtmD1ktFVvkvmnspupG7BHs7fCpJ-nY-vjrug-iNW3YjtYoOPxXghqTFnoL9elqRFwPEGMgBbvZursG7R4oL4j-jRg-Dh2MY4irW5nw84ihjh0T_5SIvUSebYWevqKuPtt2npUIlkHvwAjAJUEYIpT6aiL_QxOuoWJGKf0Tt47XddC9FHXra1sHTaCPw8rVPWeR4sna4OyO868vk-eCd33ogpiI1CaoremSLsCkKMeaCWqLiEBY6bpdonEja8pYWUMTStNqIpZg0ndb1f3deukotFMa7hz3-oLX8R_xzIjUBy175OnUQbeUb2SC8bb6MU6pBWZOiVcWTcC03M3s4jHaoEUwxwT2i2v-ejDWDtO5xcuW3mVId2vmPHjRtgT0RnTNH9GzAV8DTcx7tP_XRcyK8uDfNvKV3lfANKIrRzGojEuobgNsxRZZ8nM_vxYnMVQLZN1SZg7ivBPibUQF3yAu9eGKReJUNIPIA-5EKZ2IQMW04YAiGiHyMtoejYZav1Aj3mCLRfetwdK6f9GlSLYHfk_LN3lhaRseblVJhELntkPc42q2so7ongzOJHCrl3SEdzvyclEW-AuODNb03-aDHj3hP-tTuYTTEZzwg5kgcsOisd_f8i8-ZMAkkPx6iI2YXPSc',
    p: '43Klb8UPnGpJrEH12GO7UWTJ4iNen9ZAJ9t7lKC0ZOu5sRWJkMuvx9QTbjhEIuP14RZYu_EgobR-p1fj-1wA_xSdkoGK53mF7WV3Rhg1dzm4HE-ARL-bdzsMnXSg1t5oaTfeV6CfGMJ9eWM_BeoZmhQbzJU2cvvPCEXvysGOZjC2hfTYo1Tdy62PgJvcFBXfi-sGlLRYgOTx2KOup62XuJ7c2IebYlV0kK8PDKlKQdHSmb0PgFHJmULmd_SpG0PktmDzbIxvigf3Cr57v3mCtZjDsa2RgV9DgcslJHubl5oADVr6AiqyF-Hm84rFQtov3BFXLhPmOq_UBbGvJZMUaQ',
    q: '2r8qk5v3dNDN72xWy8TKZhLbYmnGJMwT7_thK7Zc4EKTrYuJ3oPmVey4TwjheYHOn99cGrno1yel1KB5JsUaaidMFrAokq02RL2C9ZP9iX2tTi026B7Xmh-9gGVYvqFm0xKSj7e4M7klzYO02Ma5SQ1oyScbnlkmtNATXWewNfxD-kZ9uXArWJGWOP5WEUSUsA7aMNuvGNv9gf8YnreJ9QIqJTIqD12OD7ivshYASO1gUeTG8FJhkUk-gDIuu9hmfCMUUgRtTUYVmFxEJaOWqIiy3lE2tRewiQV6sVGBBDwEOz098PXLdDAXhnATruCWdVmo3fCyuMNVQcou5KNTDw',
    qi: '4Mpy9v8aoCZJr79xQCz5iMUdflAwDVVZ2nticnLGbuDoslSYayIpAD06QiEp5KWiM83wg9Bczkf17EEMp7dP2wtXYBbdQxRHhVLw3VsbQ80XcsEM-bXJlzWe-5bhfvgVAzgjCxyp1PeBcmNMmFvDoS4d_pb_2rM2hv6SJ_bwCAx7SAiMqcN7CozuuUdKi0V6LS_6CCmkjDciGNRjzON3qfg4JLgA0P_agDgCMDCxzi-DVB4gjP9r6kErrD6u_z_jWQ-7LmVtma3ojhCR_gRlduCFmljyCbbbEfNhncpVT2dHehoOglAiX9k6ZuFjJYOJnWK3zODu_TEfauZFuh8GEg'
};
