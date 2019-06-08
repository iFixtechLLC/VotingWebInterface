import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { HelpComponent } from './help.component';
import { HelpRoutingModule } from './help.routing';

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule
  ],
  declarations: [
      HelpComponent
  ]
})
export class HelpModule { }
