import { Group } from './group';

export interface Choice {
    id: string;
    name: string;
    groups?: Group[];
}
