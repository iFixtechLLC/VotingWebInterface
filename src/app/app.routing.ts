import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'ballot',
        loadChildren: './ballot/ballot.module#BallotModule'
    },
    {
        path: 'finish',
        loadChildren: './finish/finish.module#FinishModule'
    },
    {
        path: '**',
        redirectTo: '/auth',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            useHash: true
        })
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {}
