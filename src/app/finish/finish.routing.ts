import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishComponent } from './finish.component';
import { FinishGuard } from './finish.guard';

export const finishRoutes: Routes = [
    {
        path: '',
        component: FinishComponent,
        canActivate: [
            FinishGuard
        ]
    }
];

export const finishRoutingProviders = [
    FinishGuard
];


@NgModule({
    imports: [
        RouterModule.forChild(finishRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: finishRoutingProviders
})
export class FinishRoutingModule { }
