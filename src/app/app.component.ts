import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Auth } from './shared/auth';
import { GravatarComponent } from './gravatar';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, GravatarComponent],
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;
  user: any;
  openDropdown: boolean = false;

  constructor(private _auth: Auth,
    private _router: Router) {

  }

  dropdown() {
    this.openDropdown = !this.openDropdown;
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

  ngOnInit() {
    this._auth.subscribe(user => {
      this.user = user;
      this.loggedIn = !!user;
    });
  }
}
