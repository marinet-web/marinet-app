import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt/angular2-jwt';

import { environment } from '../environment';
import { contentHeaders } from '../shared';

import { Observable } from 'rxjs/Rx';

const baseUrl = environment.baseUrl;

export interface App {
    id: string;
    name: string;
    key: string;
    errors: number;
    openErrors: number;
}

@Injectable()
export class AppsService {

    constructor(private _http: AuthHttp) { }

    find() {
        return this._http.get(`${baseUrl}/account/apps`, {headers: contentHeaders})
        .map(response => response.json())
        .catch(this.handleException);
    }

    save(app) {
        return this._http.post(`${baseUrl}/account/app`, app, {headers: contentHeaders})
        .catch(this.handleException);
    }
    
    handleException(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}