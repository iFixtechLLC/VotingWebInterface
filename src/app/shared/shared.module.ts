import { NgModule, ModuleWithProviders, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import { MarkdownComponent } from './markdown/markdown.component';
import { ConverterService } from './markdown/converter.service';
import { SVGIconComponent } from './svg-icon/svg-icon.component';
import { SVGIconService } from './svg-icon/svg-icon.service';
import { DialogService } from './dialog/dialog.service';
import { DictionaryService } from './dictionary.service';
import { ElectionService } from './election.service';
import { EventLoggerService } from './event-logger.service';
import { UserService } from './user.service';
import { VoteService } from './vote.service';
import { AccessibilityService } from './accessibility.service';
import { DialogComponent } from './dialog/dialog.component';
import { ConfigService, configFactory } from './config/config.service';
import { CryptoService } from './crypto/crypto.service';
import { BallotService } from './ballot.service';
import { LoadingService } from './loading.service';
import { TimeoutService } from './timeout.service';
import { WindowRef } from './window-ref';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        NgbModalModule
    ],
    declarations: [
        MarkdownComponent,
        SVGIconComponent,
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    exports: [
        MarkdownComponent,
        SVGIconComponent,
        CommonModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AccessibilityService,
                BallotService,
                DialogService,
                DictionaryService,
                ElectionService,
                EventLoggerService,
                UserService,
                ConverterService,
                SVGIconService,
                VoteService,
                ConfigService,
                CryptoService,
                LoadingService,
                TimeoutService,
                DatePipe,
                {
                    provide: APP_INITIALIZER,
                    useFactory: configFactory,
                    deps: [ ConfigService, Injector ],
                    multi: true
                },
                WindowRef
            ]
        };
    }

}
