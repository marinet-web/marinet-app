import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Response } from '@angular/http';

import { AppsService, App } from './apps.service';

@Component({
    moduleId: module.id,
    selector: 'newApp',
    templateUrl: 'newapp.component.html',
    styleUrls: ['newapp.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class NewAppComponent implements OnInit {

    appName: string = '';

    constructor(private _appsService: AppsService,
        private _router: Router) { }

    ngOnInit() { }

    save() {
        this._appsService.save({ name: this.appName })
            .subscribe((response: Response) => {
                if (response.ok)
                    this._router.navigate(['']);
                else
                    console.log(response.statusText);
            },
            error => alert('Error!'));
    }

}
