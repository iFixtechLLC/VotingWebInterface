import { Ballot } from '../app/core/ballot';

export const ballot: Ballot = {
    id: 'ballot0',
    name: 'My Ballot',
    contests: [
        {
            id: 'contest0',
            name: 'Start',
            config: {}
        },
        {
            id: 'contest1',
            name: 'Position A',
            choices: [
                {
                    id: 'contest1choice0',
                    name: 'John Doe',
                },
                {
                    id: 'contest1choice1',
                    name: 'Elizabeth Banks'
                },
                {
                    id: 'contest1choice2',
                    name: 'Jack Smith'
                },
                {
                    id: 'contest1choice3',
                    name: 'Mary Jones'
                },
                {
                    id: 'contest1choice4',
                    name: 'Henry Jones'
                }
            ],
            config: {
                choiceDetails: true,
                undervote: 'allow'
            },
            writein: true,
            rules: {
                voting: 'simple',
                maxselectable: 1
            }
        },
        {
            id: 'contest2',
            name: 'Position B',
            choices: [
                {
                    id: 'contest2choice0',
                    name : 'James Stuart'
                },
                {
                    id: 'contest2choice1',
                    name: 'Kelly Grace'
                }
            ],
            config: {
                choiceDetails: true,
                undervote: 'allow'
            },
            writein: false,
            rules: {
                voting: 'simple',
                maxselectable: 1
            }
        }
    ]
};
