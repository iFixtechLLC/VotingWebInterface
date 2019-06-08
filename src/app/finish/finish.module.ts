import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { FinishComponent } from './finish.component';
import { FinishRoutingModule } from './finish.routing';

@NgModule({
    imports: [
        SharedModule,
        FinishRoutingModule
    ],
    declarations: [
        FinishComponent
    ]
})
export class FinishModule { }
