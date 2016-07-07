import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

import { environment } from '../environment';
import { contentHeaders } from '../shared';

import { Observable } from 'rxjs/Rx';

const baseUrl = environment.baseUrl;

export interface Comment {
    createdAt: Date;
    userEmail: string;
    userRole: string;
    userName: string;
    errorHash: string;
    message: string;
    _id: string;
}

@Injectable()
export class CommentService {

    constructor(private _http: AuthHttp) { }

    find(hash: string) {
        return this._http.get(`${baseUrl}/comments/${hash}`,{headers: contentHeaders})
        .map(response => {
            if(response.ok) return <[Comment]>response.json();
            return <[Comment]>[];
        });
    }

    comment(data: Comment) {
        return this._http.post(`${baseUrl}/comment`, JSON.stringify(data), {headers: contentHeaders});
    }

}