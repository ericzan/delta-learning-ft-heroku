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
    NgxStripeModule.forRoot("pk_test_51KNUZgHynfh9L9pTnmw9bgxGbSEhc3nJQAAFdWdcbagjtlGp0psCpERWiyTSTNkUF3CNozBptdh8lBj8YVltuPH900jD62sCUN")

  ]
})
export class HomeModule { }
