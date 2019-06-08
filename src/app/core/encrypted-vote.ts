import { EncryptedSelection } from './encrypted-selection';

export interface EncryptedVote {
    channel: string;
    encrypted: boolean;
    selections: EncryptedSelection[];
}
