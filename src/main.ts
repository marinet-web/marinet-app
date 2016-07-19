import { HTTP_PROVIDERS } from '@angular/http';
import { FORM_PROVIDERS } from '@angular/forms';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';

import {
  AppComponent,
  environment,
  APP_ROUTER_PROVIDERS,
  AuthGuard,
  Auth,
  AppsService,
  ErrorsService,
  CommentService
} from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  AuthGuard,
  Auth,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  FORM_PROVIDERS,
  AppsService,
  ErrorsService,
  CommentService
]);

