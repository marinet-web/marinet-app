import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { AuthGuard } from './shared';
import { AppsComponent } from './apps';
import { ErrorsComponent } from './error';

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'apps', component: AppsComponent },
  { path: 'errors', component: ErrorsComponent },
  { path: '**', component: LoginComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
