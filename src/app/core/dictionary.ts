export class Dictionary {
    private get SEPARATOR() { return '_'; };

    private _kv: { [ key: string ]: string };
    private _locale: string;

    constructor(locale: string, kv: { [ key: string ]: string }) {
        this._kv = kv;
        this._locale = locale;
    }

    get locale(): string {
        return this._locale;
    }

    getPrefixedValue(prefix: string, key: string, id?: string) {
        let fullKey: string;
        if (id) {
            fullKey = [
                prefix,
                this.SEPARATOR,
                id,
                this.SEPARATOR,
                key
            ].join('');
        } else {
            fullKey = [
                prefix,
                this.SEPARATOR,
                key
            ].join('');
        }

        return this.getValue(fullKey);
    }

    getValue(key: string): string {
        return this._kv[key];
    }
}
