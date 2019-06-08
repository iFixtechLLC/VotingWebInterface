import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';
import { TextSizeComponent } from './text-size/text-size.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ContrastComponent } from './contrast/contrast.component';
import { BlackoutComponent } from './blackout/blackout.component';
import { ActiveTextSizePipe } from './text-size/active-text-size.pipe';

@NgModule({
    imports: [
        SharedModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsComponent,
        TextSizeComponent,
        TopMenuComponent,
        ContrastComponent,
        BlackoutComponent,
        ActiveTextSizePipe
    ]
})
export class SettingsModule { }
