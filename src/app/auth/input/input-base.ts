import { Credential } from '../../core';

export class InputBase<T> {
    value: T;
    key: string;
    required: boolean;
    controlType: string;

    constructor(cred: Credential) {
        this.key = cred.id || '';
        this.required = !!cred.required;
    }
}
