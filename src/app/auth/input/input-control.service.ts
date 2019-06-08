import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { InputBase } from './input-base';
import { TextInput } from './text-input';

import { Credential } from '../../core';
import { ConfigService, ElectionService } from '../../shared';
import { DateSelect } from './date-select';

@Injectable()
export class InputControlService {
    private get WEB_CHANNEL(): string { return this._config.get('webChannel'); };

    constructor(
        private _config: ConfigService,
        private _electionService: ElectionService
    ) { }

    toFormGroup(inputs: InputBase<any>[]): FormGroup {
        const group: any = {};

        inputs.forEach(input => {
            const validators: ValidatorFn[] = [];
            if (input.required) {
                validators.push(Validators.required);
            }
            if (input['maxLength']) {
                validators.push(Validators.maxLength(input['maxLength']));
            }
            if (input['minLength']) {
                validators.push(Validators.minLength(input['minLength']));
            }
            if (input['pattern']) {
                validators.push(Validators.pattern(input['pattern']));
            }

            group[input.key] = new FormControl(input.value || '', Validators.compose(validators));
        });

        return new FormGroup(group);
    }

    toInput(cred: Credential): InputBase<any> {
        if (cred.type === 'date') {
            const periodConfig = this._electionService.period.config;
            const endianness = periodConfig ? periodConfig['endianness'] : null;
            return new DateSelect(cred, endianness);
        }
        return new TextInput(cred);
    }

    toInputs(credentials: Credential[]): InputBase<any>[] {
        const inputs: InputBase<any>[] = [];

        credentials.forEach((credential) => {
            if (credential.channels.includes(this.WEB_CHANNEL)) {
                inputs.push(this.toInput(credential));
            }
        });

        return inputs;
    }
}
