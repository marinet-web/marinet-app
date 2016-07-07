import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { AuthGuard } from './shared';
import { AppsComponent, NewAppComponent } from './apps';
import { ErrorsComponent, ErrorComponent } from './error';

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'apps', component: AppsComponent, canActivate: [AuthGuard]  },
  { path: 'newapp', component: NewAppComponent, canActivate: [AuthGuard]  },
  { path: ':app/errors', component: ErrorsComponent, canActivate: [AuthGuard]  },
  { path: ':app/error/:id', component: ErrorComponent, canActivate: [AuthGuard]  },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: LoginComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
