import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { ErrorsService, ErrorAggregation, Result, ErrorFilter } from './errors.service';
import { TruncatePipe } from '../shared/truncate.pipe';

@Component({
    moduleId: module.id,
    selector: 'errors',
    templateUrl: 'errors.component.html',
    pipes: [TruncatePipe],
    directives: [ROUTER_DIRECTIVES]
})
export class ErrorsComponent implements OnInit {
    name: string = '';
    sugestions: [string] = <[string]>new Array();
    total: number = 0;
    errors: [ErrorAggregation];
    busy: boolean = false;
    filter: ErrorFilter = <ErrorFilter>{};
    openDropdown: boolean = false;

    constructor(private _errorsService: ErrorsService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    ngOnInit() {
        this.busy = true;
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
        this._errorsService.find(this.filter)
            .subscribe((errors: Result<ErrorAggregation>) => {
                this.errors = errors.data;
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

}