import { ConfigService } from './config.service';

export class MockConfigService extends ConfigService {
    constructor() {
        super();
        this._config = {
            'authPrefix': 'auth',
            'ballotPrefix': 'ballot',
            'electionPrefix': 'election',
            'contestPrefix': 'contest',
            'choicePrefix': 'choice',
            'helpPrefix': 'help',
            'reviewPrefix': 'review',
            'summaryPrefix': 'summary',
            'finishPrefix': 'finish',
            'settingsPrefix': 'settings',
            'sessionPrefix': 'session',
            'ballotValidPrefix': 'ballot_valid',
            'ballotInvalidPrefix': 'ballot_invalid',
            'finishTimeout': 15000,
            'writeInId': 'write_in',
            'authUrl': 'api/auth',
            'ballotUrl': 'api/ballot',
            'dictionaryUrl': 'api/dictionary',
            'electionUrl': 'api/election',
            'voteUrl': 'api/vote',
            'tokenName': 'evsSession'
        };
    }

    load(): Promise<any> {
        return Promise.resolve();
    }

    set(key: string, value: any) {
        this._config[key] = value;
    }
}
