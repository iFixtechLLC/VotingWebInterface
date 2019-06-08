import { Choice } from './choice';
import { ContestRules } from './contest-rules';

export interface Contest {
    id: string;
    expanded?: boolean;
    name: string;
    rules?: ContestRules;
    choices?: Choice[];
    config: {};
    writein?: boolean;
    extref?: string;
}
