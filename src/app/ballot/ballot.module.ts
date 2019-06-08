import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared';
import { SettingsModule } from '../settings';

import { BallotRoutingModule } from './ballot.routing';

import { ContestModule } from './contest';
import { SummaryModule } from './summary';
import { ReviewModule } from './review';

import { BallotComponent } from './ballot.component';

@NgModule({
    declarations: [
        BallotComponent
    ],
    imports: [
        ContestModule,
        ReviewModule,
        SharedModule,
        SummaryModule,
        BallotRoutingModule,
        NgbModule
    ]
})
export class BallotModule {

}
