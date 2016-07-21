import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { InfiniteScroll } from 'angular2-infinite-scroll/angular2-infinite-scroll';

import { ErrorsService, Error, Result, ErrorFilter } from './errors.service';
import { TruncatePipe } from '../shared/truncate.pipe';

@Component({
    moduleId: module.id,
    selector: 'errors',
    templateUrl: 'errors.component.html',
    pipes: [TruncatePipe],
    directives: [ROUTER_DIRECTIVES, InfiniteScroll]
})
export class ErrorsComponent implements OnInit {
    name: string = '';
    sugestions: [string] = <[string]>new Array();
    total: number = 0;
    errors: [Error] = <[Error]>[];
    busy: boolean = false;
    filter: ErrorFilter = <ErrorFilter>{ page: 1};
    openDropdown: boolean = false;

    constructor(private _errorsService: ErrorsService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    ngOnInit() {
        
        this._route.params.subscribe(params =>{
            this.name = params['app'];
            this.filter.appName = this.name;
            this.search();
        });
    }

    default() {
        delete this.filter.solved;
        this.search();
    }

    onlySolved() {
        this.filter.solved = true;
        this.search();
    }

    search() {
        this.busy = true;
        this._errorsService.find(this.filter)
            .subscribe((errors: Result<Error>) => {
                errors.data.forEach((item) => {
                    this.errors.push(item);
                });
                this.sugestions = errors.suggestions || <[string]>[];
                this.total = errors.totalSize;
                this.busy = false;
            });
    }

    orderAsc(event) {
        if(this.filter.sort) delete this.filter.sort
        else this.filter.sort = 'asc';    
        this.search();
    }

     setQuery(text) {
        this.filter.query = text;    
        this.search();
    }

    onScroll(){
        this.filter.page++;
        this.search();
    }

}