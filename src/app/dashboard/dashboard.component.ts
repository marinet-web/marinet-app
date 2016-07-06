import { Component, OnInit } from '@angular/core';

import { AppsService, App } from '../apps';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  apps: [any] = [{}];

  constructor(private _appsService: AppsService) {}

  ngOnInit() {
    this._appsService.find()
    .subscribe(
      (apps: [App])=> this.apps = apps,
      errors => alert('error'));
  }

}
