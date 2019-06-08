import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { BasicAuthComponent } from './basic';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: BasicAuthComponent
            },
            {
                path: 'settings',
                loadChildren: '../settings/settings.module#SettingsModule'
            },
            {
                path: 'help',
                loadChildren: '../help/help.module#HelpModule'
            }
        ],
        canActivate: [
            AuthGuard
        ]
    }
];

const authRoutingProviders: any[] = [
    AuthGuard
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: authRoutingProviders
})
export class AuthRoutingModule {}
