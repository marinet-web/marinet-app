import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { AuthGuard } from './shared/auth.guard';

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
