import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { Auth } from '../shared/auth';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private _router: Router,
    private _auth: Auth) { }

  login(event) {
    event.preventDefault();

    let user = JSON.stringify({ username: this.username, password: this.password });
    this._auth.login(user).subscribe(
      response => {
        this._router.navigate(['/']);
      },
      error => {
        alert('Error!');
      });
  }

  signup(event) {
    event.preventDefault();
    this._router.navigate(['/signup']);
  }

}
