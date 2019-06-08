import { Instance } from './instance';
import { Locale } from './locale';

export interface Election {
    id: string;
    extref: string;
    ballotstyles: string[];
    periods: string[];
    locales: Locale[];
    contests: string[];
    name: string;
    groups: string[];
}
