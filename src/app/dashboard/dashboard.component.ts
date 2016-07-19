import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AppsService, App } from '../apps';

import {ClipboardDirective} from 'angular2-clipboard';

import {ToasterService} from 'angular2-toaster';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES, ClipboardDirective]
})
export class DashboardComponent implements OnInit {

  apps: [any] = [{}];

  constructor(private _appsService: AppsService,
    private _toasterService: ToasterService) { }

  ngOnInit() {
    this._appsService.find()
      .subscribe(
      (apps: [App]) => this.apps = apps,
      errors => this._toasterService.pop('error','Dashboard', 'Cannot get applications. Server is unvailable.'));
  }

  public copied(success: boolean) {
    this._toasterService.pop('success','Dashboard', 'Token successfully copied to clipboard.');
  }
}
