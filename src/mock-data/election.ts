import { Election } from '../app/core/election';

export const election: Election = {
    id: 'election0',
    name: 'Demo Election 2016',
    ballotstyles: [ 'ballot0' ],
    contests: [
        'contest0',
        'contest1'
    ],
    locales: [
        {
            country: 'US',
            extref: 'eng',
            id: 'eng',
            language: 'eng',
            localizedname: 'TODO',
            name: 'eng',
            script: 'TODO',
            subdivision: 'US'
        }
    ],
    periods: [
        'period0'
    ],
    groups: [],
    extref: 'extref'
};
