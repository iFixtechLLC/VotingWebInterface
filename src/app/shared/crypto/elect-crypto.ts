export interface ElectCrypto {
    encrypt(data: string, publicKey: JsonWebKey): PromiseLike<string>;
    decrypt(data: string, privateKey: JsonWebKey): PromiseLike<string>;

    encryptProgress(data: string, key: string): PromiseLike<string>;
    decryptProgress(data: string, key: string): PromiseLike<string>;
}
