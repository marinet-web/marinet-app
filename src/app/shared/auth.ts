import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JwtHelper } from 'angular2-jwt/angular2-jwt';

import { environment } from '../environment';
import { contentHeaders } from './headers';

let loginUrl = environment.baseUrl + '/login';

@Injectable()
export class Auth extends EventEmitter<any> {

    private _helper: JwtHelper = new JwtHelper();

    constructor(private _http: Http) {
        super();
    }

    login(user) {
        return this._http.post(loginUrl, user, { headers: contentHeaders })
            .map(res => {
                let token = res.json();
                this.loggedIn(token);
                return token;
            })
            .catch(this.handleException);
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

    handleException(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}