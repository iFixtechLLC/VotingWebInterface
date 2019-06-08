import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { EncryptedVote, Vote } from '../../core';

import { ConfigService } from '../config/config.service';
import { WindowRef } from '../window-ref';

import { ElectCrypto } from './elect-crypto';
import { JSCrypto } from './js-crypto';
import { WebCrypto } from './web-crypto';

@Injectable()
export class CryptoService {
    private _crypto: ElectCrypto;

    constructor(
        private _windowRef: WindowRef
    ) {
        const win = this._windowRef.nativeWindow;

        if (win.crypto && win.crypto.subtle) {
            this._crypto = new WebCrypto(win);
        } else {
            this._crypto = new JSCrypto();
        }
    }

    encrypt(data: string, publicKey: JsonWebKey): PromiseLike<string> {
        return this._crypto.encrypt(data, publicKey);
    }

    decrypt(data: string, privateKey: JsonWebKey): PromiseLike<string> {
        return this._crypto.decrypt(data, privateKey);
    }

    encryptVote(vote: Vote, publicKey: JsonWebKey): Observable<EncryptedVote> {
        return new Observable((observer) => {
            const encryptedVote: EncryptedVote = {
                channel: 'web',
                selections: [],
                encrypted: true
            };
            const promises = [];

            vote.selections.forEach((selection) => {
                const stringifiedSelections = JSON.stringify(selection.choiceData);
                const promise = this.encrypt(stringifiedSelections, publicKey)
                    .then((encryptedSelections) => {
                        const encryptedSelection = {
                            contest: selection.contest,
                            encryptedchoicedata: `data:application/octet-stream;base64,${encryptedSelections}`
                        };
                        encryptedVote.selections.push(encryptedSelection);
                    }, (err) => {
                        observer.error(err);
                    });
                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                observer.next(encryptedVote);
                observer.complete();
            });
        });
    }

    encryptProgress(progress: Vote, key: string): Observable<string> {
        return new Observable((observer) => {
            const progressString = JSON.stringify(progress);
            this._crypto.encryptProgress(progressString, key)
                .then((result) => {
                    observer.next(result);
                    observer.complete();
                }, (error) => {
                    observer.error(error);
                });
        });
    }

    decryptProgress(encryptedProgress: string, key: string): Observable<Vote> {
        return new Observable((observer) => {
            this._crypto.decryptProgress(encryptedProgress, key)
                .then((result) => {
                    try {
                        const vote = JSON.parse(result);
                        observer.next(vote);
                        observer.complete();
                    } catch (err) {
                        observer.error(err);
                    }
                }, (error) => {
                    observer.error(error);
                });
        });
    }
}
