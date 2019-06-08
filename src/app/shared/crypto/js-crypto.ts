import { cipher, jsbn, md, pki, random, util } from 'evs-forge';

import { ConfigService } from '../config/config.service';
import { ElectCrypto } from './elect-crypto';

export class JSCrypto implements ElectCrypto {
    private get iv(): util.ByteBuffer { return new util.ByteBuffer('0000000000000000'); };

    constructor() {}

    encrypt(data: string, publicKey: JsonWebKey): PromiseLike<string> {
        // Step 1: Generate 256-bit key
        const key = random.getBytesSync(32);

        // Step 2: Encrypt data with key
        const ciph = cipher.createCipher('AES-CBC', key);
        ciph.start({iv: this.iv});
        ciph.update(new util.ByteBuffer(data));
        ciph.finish();
        const encryptedData = ciph.output;

        // Step 3: Encrypt key using RSA public key
        const rsaKey = pki.setRsaPublicKey(
            this._base64urlToBigInteger(publicKey.n),
            this._base64urlToBigInteger(publicKey.e)
        );
        const encryptedKey = rsaKey.encrypt(key, 'RSA-OAEP');

        // Step 4: Encode parts as base64 strings
        const b64Key = util.binary.base64.encode(util.binary.raw.decode(encryptedKey));
        const b64Data = util.binary.base64.encode(util.binary.raw.decode(encryptedData.getBytes()));

        // Step 5: Concatenate and delimit string, then return
        const result = `${b64Key}\t${b64Data}`;
        return Promise.resolve(result);
    }

    decrypt(encrypted: string, privateKey: JsonWebKey): PromiseLike<string> {
        // Step 0: Cut the encrypted data into key and data segments by splitting on \t
        const keyParts = encrypted.split('\t');
        const b64Key = keyParts[0];
        const b64Data = keyParts[1];

        // Step 1: Convert base64 string to binary encoding
        const encryptedKey = util.binary.raw.encode(util.binary.base64.decode(b64Key));
        const encryptedData = util.binary.raw.encode(util.binary.base64.decode(b64Data));

        // Step 2: Decrypt the key using the private key
        const rsaKey = pki.setRsaPrivateKey(
            this._base64urlToBigInteger(privateKey.n),
            this._base64urlToBigInteger(privateKey.e),
            this._base64urlToBigInteger(privateKey.d),
            this._base64urlToBigInteger(privateKey.p),
            this._base64urlToBigInteger(privateKey.q),
            this._base64urlToBigInteger(privateKey.dp),
            this._base64urlToBigInteger(privateKey.dq),
            this._base64urlToBigInteger(privateKey.qi)
        );
        const decryptedKey = rsaKey.decrypt(encryptedKey, 'RSA-OAEP');

        // Step 3: Use the decrypted key to decrypt the data
        const decipher = cipher.createDecipher('AES-CBC', decryptedKey);
        decipher.start({iv: this.iv});
        decipher.update(new util.ByteBuffer(encryptedData));
        decipher.finish();
        const decryptedData = decipher.output.getBytes();

        return Promise.resolve(decryptedData);
    }

    encryptProgress(data: string, key: string): PromiseLike<string> {
        const k = util.binary.raw.encode(util.binary.base64.decode(key));
        const ciph = cipher.createCipher('AES-CBC', k);
        ciph.start({iv: this.iv});
        ciph.update(new util.ByteBuffer(data));
        ciph.finish();
        const encryptedData = ciph.output;
        const encryptedString = util.binary.base64.encode(util.binary.raw.decode(encryptedData.getBytes()));

        return Promise.resolve(encryptedString);
    }

    decryptProgress(data: string, key: string): PromiseLike<string> {
        const encryptedData = util.binary.raw.encode(util.binary.base64.decode(data));
        const k = util.binary.raw.encode(util.binary.base64.decode(key));
        const decipher = cipher.createDecipher('AES-CBC', k);
        decipher.start({iv: this.iv});
        decipher.update(new util.ByteBuffer(encryptedData));
        decipher.finish();
        const decryptedData = decipher.output.getBytes();

        return Promise.resolve(decryptedData);
    }

    private _base64urlToBigInteger(str): jsbn.BigInteger {
        const bytes = util.decode64(
            (str + '==='.slice((str.length + 3) % 4))
            .replace(/\-/g, '+')
            .replace(/_/g, '/'));
        return new jsbn.BigInteger(util.bytesToHex(bytes), 16);
    }
}
