import { Credential } from '../../core';
import { InputBase } from './input-base';

export class DateSelect extends InputBase<Date> {
    format: string;

    constructor(cred: Credential, format: string) {
        super(cred);

        this.controlType = 'date-select';
        this.format = format
    }
}
