import { Contest } from './contest';

export interface Ballot {
    id: string;
    name: string;
    contests: Contest[];
}
