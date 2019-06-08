import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { SummaryModule } from '../summary';

import { SimpleChoiceComponent } from './simple-choice';
import { RankedChoiceComponent } from './ranked-choice';
import { WriteInComponent } from './write-in';

import { ContestComponent } from './contest.component';

@NgModule({
    declarations: [
        ContestComponent,
        SimpleChoiceComponent,
        RankedChoiceComponent,
        WriteInComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        SummaryModule
    ],
    exports: [
        ContestComponent
    ]
})
export class ContestModule {

}
