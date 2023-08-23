import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationRoutes } from './authentication.routing';
import { SharedModule } from '@shared/shared.module';
import { RecoveryComponent } from './components/recovery/recovery.component';



@NgModule({
  declarations: [
    SignInComponent,
    RecoveryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutes
  ]
})
export class AuthenticationModule { }
