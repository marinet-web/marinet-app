import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt/angular2-jwt';

import { environment } from '../environment';
import { contentHeaders } from './headers';

let loginUrl = environment.baseUrl + '/api/account/login';

@Injectable()
export class Auth extends EventEmitter<any> {

    private _helper: JwtHelper = new JwtHelper();

    constructor(private _http: Http) {
        super();
    }

    login(user) {
        return this._http.post(loginUrl, user, { headers: contentHeaders })
            .map(res => {
                if (res.ok) {
                    let token = res.text();
                    this.loggedIn(token);
                }
                return res;
            });
    }

    logout() {
        localStorage.removeItem('id_token');
        super.emit(null);
    }

    loggedIn(token) {
        let user = this._helper.decodeToken(token);
        localStorage.setItem('id_token', token);
        super.emit(user);
    }

    getUser() {
        let token: string = localStorage.getItem('id_token');
        if (!token || tokenNotExpired(token)) return;

        return this._helper.decodeToken(token);
    }
}