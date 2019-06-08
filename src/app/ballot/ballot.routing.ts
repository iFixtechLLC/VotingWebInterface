import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BallotComponent } from './ballot.component';
import { BallotGuard } from './ballot.guard';
import { SummaryComponent } from './summary';
import { ReviewComponent } from './review';
import { ContestComponent, ContestGuard } from './contest';

export const ballotRoutes: Routes = [
    {
        path: '',
        component: BallotComponent,
        children: [
            {
                path: 'help',
                loadChildren: '../help/help.module#HelpModule'
            },
            {
                path: 'contest/:contestIndex',
                component: ContestComponent,
                canDeactivate: [ContestGuard]
            },
            {
                path: 'summary',
                component: SummaryComponent
            },
            {
                path: 'review',
                component: ReviewComponent
            },
            {
                path: 'settings',
                loadChildren: '../settings/settings.module#SettingsModule'
            },
            {
                path: '**',
                redirectTo: 'contest/0',
                pathMatch: 'full'
            }
        ],
        canActivate: [ BallotGuard ]
    }
];

const ballotProviders: any[] = [
    BallotGuard,
    ContestGuard
];

@NgModule({
    imports: [
        RouterModule.forChild(ballotRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: ballotProviders
})
export class BallotRoutingModule {}
