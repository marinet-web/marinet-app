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
                    this.setExpiration();
                }
                return res;
            });
    }

    logout() {
        if(localStorage.getItem('id_token')){
            console.log('Logout');
            localStorage.removeItem('id_token');
            super.emit(undefined);
        }
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

    setExpiration(){
        let user = this.getUser();
        let now = new Date();
        let target = new Date(user.exp * 1000);
        let time = target.getTime() - now.getTime();
        setTimeout(() => {
            this.logout();
        }, time);
    }
}