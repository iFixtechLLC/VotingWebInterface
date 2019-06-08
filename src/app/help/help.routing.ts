import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help.component';

const helpRoutes: Routes = [
    {
        path: '',
        component: HelpComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(helpRoutes),
        RouterModule
    ],
    exports: [
        RouterModule
    ]
})
export class HelpRoutingModule { }
