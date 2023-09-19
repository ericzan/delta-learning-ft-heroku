import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'sing-up',
    component: SingUpComponent
  },
];

export const AuthenticationRoutes = RouterModule.forChild(routes);
