import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Auth } from './shared/auth';
import { GravatarComponent } from './gravatar';
import { AppsService, App } from './apps';
import { ToasterContainerComponent } from 'angular2-toaster';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, GravatarComponent, ToasterContainerComponent],
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;
  user: any;
  openDropdown: boolean = false;
  apps: [App];

  constructor(private _auth: Auth,
    private _router: Router,
    private _appsService: AppsService) {

  }

  dropdown() {
    this.openDropdown = !this.openDropdown;
  }

  logout() {
    this._auth.logout();
    this.openDropdown = false;
    this._router.navigate(['/login']);
  }

  ngOnInit() {
    this._auth.subscribe(user => {
      this.user = user;
      this.loggedIn = !!user;

      if (this.loggedIn){
        this._appsService.find()
          .subscribe(
          (apps: [App]) => this.apps = apps, error => console.log(error));
      }else{
        console.log('Expired');
        this.logout();
      }
        
    });
  }
}
