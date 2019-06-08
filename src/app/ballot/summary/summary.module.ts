import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';

import { SummaryComponent } from './summary.component';
import { ContestSummaryComponent } from './contest-summary';

@NgModule({
    declarations: [
        SummaryComponent,
        ContestSummaryComponent
    ],
    imports: [
        SharedModule,
        RouterModule
    ],
    exports: [
        SummaryComponent
    ]
})
export class SummaryModule {

}
