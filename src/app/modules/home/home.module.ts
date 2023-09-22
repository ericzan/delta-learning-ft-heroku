import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutes } from './home.routing';
import { MainComponent } from './components/main/main.component';
import { MenuModule } from 'primeng/menu';

import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    MainComponent,

  ],
  imports: [
    MenuModule,
    CommonModule,
    SharedModule,
    HomeRoutes,
    NgxStripeModule.forRoot("sk_test_51KNUZgHynfh9L9pTAsgTefRSbuddpHe5pcOqRiVBUMlajUPR1jiUFLxEy4bxNSOyAIQiPVCzKm1LZRVnHTWED2NT00KJClYXjO")

  ]
})
export class HomeModule { }
