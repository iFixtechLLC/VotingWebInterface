export class ErrorMessages {
    static get GENERIC(): string { return 'generic'; };

    private static _authentication = {
        4000: 'badcreds',
        4001: 'badcreds',
        4010: 'notopen',
        4011: 'badcreds',
        4030: 'badcreds',
        4093: 'alreadyvoted',
        4094: 'alreadyvoted'
    };

    private static _submission = {
        4003: 'notopen',
        4091: 'alreadyvoted'
    };

    static authentication(errorCode: number): string {
        return this._authentication[errorCode] || this.GENERIC;
    }

    static submission(errorCode: number): string {
        return this._submission[errorCode] || this.GENERIC;
    }
};
