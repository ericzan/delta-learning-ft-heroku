import { ViewChild, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from '../payment/components/view/view.component';
import { PaymentComponent } from './components/payment/payment.component';




const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
  },
  {
    path: 'payment',
    pathMatch: 'full',
    component: PaymentComponent,
  },

];

export const PaymentRoutes = RouterModule.forChild(routes);
