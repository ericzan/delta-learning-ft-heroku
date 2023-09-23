import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



import { NgxStripeModule } from 'ngx-stripe';
import { ViewComponent } from './components/view/view.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentRoutes } from './payment.routing';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [

    ViewComponent,
    PaymentComponent


  ],
  imports: [
    PaymentRoutes,
    ReactiveFormsModule,
    CardModule,
    NgxStripeModule.forRoot("pk_test_51KNUZgHynfh9L9pTnmw9bgxGbSEhc3nJQAAFdWdcbagjtlGp0psCpERWiyTSTNkUF3CNozBptdh8lBj8YVltuPH900jD62sCUN")


  ],
  exports: [],

  providers: [],
})
export class paymentModule { }
