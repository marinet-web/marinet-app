import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { environment } from '../environment';
import { contentHeaders } from '../shared/headers';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

const baseUrl = environment.baseUrl;

export interface Result<T> {
    currentPage: number;
    sugestions: [string];
    totalPages: number;
    totalSize: number;
    data: [T]
    sort: number;
}

export interface Error {
    _id: ErrorId;
    hash: string;
    message: string;
    exception: string;
    createdAt: Date;
    solved: boolean
    count: number
}

export interface ErrorId {
    hash: string;
    appName: string;
}

export interface ErrorFilter {
    appName: string;
    page: number;
    query: string;
    solved: boolean;
    sort: string;
}


@Injectable()
export class ErrorsService {

    constructor(private _http: AuthHttp) { }

    find(filter: ErrorFilter) {
        let params: URLSearchParams = new URLSearchParams();
        if(filter.page) params.set('page', '' + filter.page);
        if(filter.query) params.set('q', '' + filter.query);
        if(filter.solved) params.set('solved', '' + filter.solved);
        if(filter.sort) params.set('sort', '' + filter.sort);

        let options = {
            headers: contentHeaders,
            search: params
        };

        return this._http.get(`${baseUrl}/${filter.appName}/errors`, options)
            .map(response => <Result<Error>>response.json());
    }
}