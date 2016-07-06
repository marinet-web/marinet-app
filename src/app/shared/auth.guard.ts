import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { Auth } from './auth';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router,
        private _auth: Auth) { }

    canActivate() {
        if (tokenNotExpired()) {
            this._auth.loggedIn(localStorage.getItem('id_token'));
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }
}
