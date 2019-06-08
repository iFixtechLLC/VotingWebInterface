import { ElectionWindow } from './election-window';
import { Credential } from './credential';

export interface Period {
    id: string;
    accessibility: {};
    auth: {
        credentials: Credential[]
    };
    ballotstyles: string[];
    config: {};
    contests: string[];
    crypto: {
        publickey: JsonWebKey;
    };
    electionid: string;
    extref: string;
    name: string;
    style: {};
    windows: ElectionWindow[];
}
