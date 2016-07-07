import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppsService, App } from './apps.service';

@Component({
  moduleId: module.id,
  selector: 'app-apps',
  templateUrl: 'apps.component.html',
  styleUrls: ['apps.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppsComponent implements OnInit {
  apps: [App];

  constructor(private _appsService: AppsService) { }

  ngOnInit() {
    this._appsService.find()
      .subscribe(
      apps => this.apps = apps,
      error => alert('Error!')
      );
  }

}
