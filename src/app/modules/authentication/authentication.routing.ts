import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
];

export const AuthenticationRoutes = RouterModule.forChild(routes);
