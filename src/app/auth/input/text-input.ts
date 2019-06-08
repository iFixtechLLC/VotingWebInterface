import { Credential } from '../../core';
import { InputBase } from './input-base';

export class TextInput extends InputBase<string> {
    type: string;
    maxLength: number;
    minLength: number;
    pattern: string;
    max: string;

    constructor(cred: Credential) {
        super(cred);
        this.controlType = 'textbox';
        this.type = cred.obfuscated ? 'password' : 'text';
        this.maxLength = cred.maxlength;
        this.minLength = cred.minlength;

        if (cred.type === 'alpha') {
            this.pattern = '[A-Za-z0-9]+';
        } else if (cred.type === 'number') {
            this.pattern = '[0-9]+';
        }
    }
}
