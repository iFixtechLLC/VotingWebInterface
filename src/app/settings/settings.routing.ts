import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

import { TopMenuComponent } from './top-menu/top-menu.component';
import { TextSizeComponent } from './text-size/text-size.component';
import { ContrastComponent } from './contrast/contrast.component';
import { BlackoutComponent } from './blackout/blackout.component';

const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                component: TopMenuComponent
            },
            {
                path: 'text-size',
                component: TextSizeComponent
            },
            {
                path: 'contrast',
                component: ContrastComponent
            },
            {
                path: 'blackout',
                component: BlackoutComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(settingsRoutes),
        RouterModule
    ],
    exports: [
        RouterModule
    ]
})
export class SettingsRoutingModule {}
