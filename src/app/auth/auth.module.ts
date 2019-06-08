import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared';
import { SettingsModule } from '../settings';

import { BasicAuthComponent } from './basic';
import { InputControlService } from './input';

import { AuthRoutingModule } from './auth.routing';
import { AuthComponent } from './auth.component';

import { DobComponent } from './dob/dob.component';
import { DobService } from './dob/dob.service';

@NgModule({
    declarations: [
        AuthComponent,
        BasicAuthComponent,
        DobComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
        NgbModule
    ],
    providers: [
        InputControlService,
        DobService
    ]
})
export class AuthModule {

}
