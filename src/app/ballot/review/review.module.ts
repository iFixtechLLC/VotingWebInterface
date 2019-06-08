import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule, InlineWarningComponent } from '../../shared';

import { ContestReviewComponent } from './contest-review';
import { SimpleChoiceSummaryComponent } from './simple-choice-summary';
import { RankedChoiceSummaryComponent } from './ranked-choice-summary';
import { ReviewComponent } from './review.component';

@NgModule({
    declarations: [
        ReviewComponent,
        SimpleChoiceSummaryComponent,
        RankedChoiceSummaryComponent,
        ContestReviewComponent,
        InlineWarningComponent
    ],
    imports: [
        SharedModule,
        RouterModule
    ],
    exports: [
        ReviewComponent
    ]
})
export class ReviewModule {

}
