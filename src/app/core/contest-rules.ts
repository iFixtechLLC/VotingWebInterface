export interface ContestRules {
    voting: string;
    name?: string;
    advancing?: number;
    minselectable?: number;
    maxselectable: number;
    tabulation?: string;
}
