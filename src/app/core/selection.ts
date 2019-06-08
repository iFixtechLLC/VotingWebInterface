import { ChoiceData } from './choice-data';

export interface Selection {
    contest: string;
    choiceData: ChoiceData;
    selectedCount: number;
}
