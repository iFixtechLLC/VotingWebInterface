import { util } from 'evs-forge';
import { ElectCrypto } from './elect-crypto';

export class WebCrypto implements ElectCrypto {
    private _crypto: SubtleCrypto;
    private get iv(): ArrayBuffer { return this._stringToArrayBuffer('0000000000000000'); };

    constructor(
        private _window: Window
    ) {
        this._crypto = this._window.crypto.subtle;
    }

    encrypt(data: string, publicKey: JsonWebKey): PromiseLike<string> {
        const dataBuffer = this._stringToArrayBuffer(data);
        return this._generateAESKey().then((cryptoKey) => {
            return this._exportAESKey(cryptoKey).then((aesData) => {
                return this._encryptVoteData(dataBuffer, cryptoKey).then((encryptedData) => {
                    return this._encryptAESKey(aesData, publicKey).then((encryptedAESKey) => {
                        const b64Key = this._stringToBase64(encryptedAESKey);
                        const b64Data = this._stringToBase64(encryptedData);
                        return `${b64Key}\t${b64Data}`;
                    });
                });
            });
        });
    }

    decrypt(data: string, privateKey: JsonWebKey): PromiseLike<string> {
        const dataParts = data.split('\t');
        const b64Key = dataParts[0];
        const b64Data = dataParts[1];

        const encryptedAESKey = this._base64ToString(b64Key);
        const encryptedData = this._base64ToString(b64Data);

        return this._decryptAESKey(encryptedAESKey, privateKey)
            .then((keyData) => this._importAESKey(keyData))
            .then((cryptoKey) => this._decryptVoteData(encryptedData, cryptoKey));
    }

    encryptProgress(data: string, key: string): PromiseLike<string> {
        const dataBuffer = this._stringToArrayBuffer(data);
        const keyBuffer = this._stringToArrayBuffer(this._base64ToString(key));
        return this._importAESKey(keyBuffer)
            .then((aesKey) => {
                const encryptOptions = {
                    name: 'AES-CBC',
                    iv: this.iv
                };

                return this._crypto.encrypt(encryptOptions, aesKey, dataBuffer)
                    .then((cipherText) => {
                        return this._stringToBase64(this._arrayBufferToString(cipherText));
                    });
            });
    }

    decryptProgress(data: string, key: string): PromiseLike<string> {
        const dataBuffer = this._stringToArrayBuffer(this._base64ToString(data));
        const keyBuffer = this._stringToArrayBuffer(this._base64ToString(key));

        return this._importAESKey(keyBuffer)
            .then((aesKey) => {
                const decryptOptions = {
                    name: 'AES-CBC',
                    iv: this.iv
                };

                return this._crypto.decrypt(decryptOptions, aesKey, dataBuffer)
                    .then((decryptedBuffer) => this._arrayBufferToString(decryptedBuffer));
            });
    }

    private _arrayBufferToString(ab: ArrayBuffer): string {
        return util.binary.raw.encode(new Uint8Array(ab));
    }

    private _stringToArrayBuffer(str: string): ArrayBuffer {
        return util.binary.raw.decode(str).buffer;
    }

    private _stringToBase64(str: string): string {
        return util.binary.base64.encode(util.binary.raw.decode(str));
    }

    private _base64ToString(b64: string): string {
        return util.binary.raw.encode(util.binary.base64.decode(b64));
    }

    private _decryptAESKey(aesKey: string, privateKey: JsonWebKey): PromiseLike<ArrayBuffer> {
        const aesBuffer = this._stringToArrayBuffer(aesKey);
        return this._importRSAPrivateKey(privateKey).then((cryptoKey) => {
            return this._crypto.decrypt({ name: 'RSA-OAEP' }, cryptoKey, aesBuffer);
        });
    }

    private _decryptVoteData(data: string, key: CryptoKey): PromiseLike<string> {
        const dataBuffer = this._stringToArrayBuffer(data);
        const decryptOptions = {
            name: 'AES-CBC',
            iv: this.iv
        };

        return this._crypto.decrypt(decryptOptions, key, dataBuffer)
            .then((decryptBuffer) => this._arrayBufferToString(decryptBuffer));
    }

    private _encryptAESKey(aesKey: ArrayBuffer, publicKey: JsonWebKey): PromiseLike<string> {
        return this._importRSAPublicKey(publicKey).then((cryptoKey) => {
            return this._crypto.encrypt({ name: 'RSA-OAEP', hash: { name: 'SHA-1' } } as any, cryptoKey, aesKey).then((cipherText) => {
                return this._arrayBufferToString(cipherText);
            });
        });
    }

    private _encryptVoteData(data: ArrayBuffer, key: CryptoKey): PromiseLike<string> {
        const encryptOptions = {
            name: 'AES-CBC',
            iv: this.iv
        };

        return this._crypto.encrypt(encryptOptions, key, data)
            .then((cipherText) => {
                return this._arrayBufferToString(cipherText);
            });
    }

    private _exportAESKey(key: CryptoKey): PromiseLike<ArrayBuffer> {
        return this._crypto.exportKey('raw', key);
    }

    private _generateAESKey(): PromiseLike<CryptoKey> {
        const keyOptions = {
            name: 'AES-CBC',
            length: 256
        };

        return this._crypto.generateKey(keyOptions, true, ['encrypt']);
    }

    private _importAESKey(keyData: ArrayBuffer): PromiseLike<CryptoKey> {
        const keyOptions = {
            name: 'AES-CBC',
            length: 256,
            generator: null,
            prime: null
        };

        return this._crypto.importKey('raw', keyData, keyOptions, false, ['encrypt', 'decrypt']);
    }

    private _importRSAPublicKey(key: JsonWebKey): PromiseLike<CryptoKey> {
        const algoOptions = {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-1' }
        };

        return this._crypto.importKey('jwk', key, algoOptions, false, ['encrypt']);
    }

    private _importRSAPrivateKey(key: JsonWebKey): PromiseLike<CryptoKey> {
        const algoOptions = {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-1' }
        };

        return this._crypto.importKey('jwk', key, algoOptions, false, ['decrypt']);
    }
}
