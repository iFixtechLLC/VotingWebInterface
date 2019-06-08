export interface Credential {
    channels: string[];
    maxlength: number;
    minlength: number;
    id: string;
    obfuscated: boolean;
    required: boolean;
    timeout?: number;
    type: string;
}
