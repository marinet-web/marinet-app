import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES , Router } from '@angular/router';
import { Response } from '@angular/http';

import { AppsService, App } from './apps.service';

@Component({
    moduleId: module.id,
    selector: 'newApp',
    templateUrl: 'newapp.component.html',
    styleUrls: ['newapp.component.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
export class NewAppComponent implements OnInit {

    app: App = <App>{};

    constructor(private _appsService: AppsService,
        private _router: Router) { }

    ngOnInit() { }

    save() {
        this._appsService.save(this.app)
            .subscribe((response: Response) => {
                if (response.ok)
                    this._router.navigate(['']);
                else
                    console.log(response.statusText);
            },
            error => alert('Error!'));
    }

}
