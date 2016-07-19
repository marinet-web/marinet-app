import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {ToasterService} from 'angular2-toaster';
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
  busy: boolean = false;

  constructor(private _router: Router,
    private _toasterService: ToasterService,
    private _auth: Auth) { }

  login(event) {
    event.preventDefault();
    this.busy = true;
    let user = JSON.stringify({ username: this.username, password: this.password });
    this._auth.login(user).subscribe(
      response => {
        this.busy = false;
        this._router.navigate(['/']);
      },
      err => {
        this.busy = false;
        if(err.status === 401)
          this._toasterService.pop('warning','Login Error', 'Invalid username or password')
        else
          this._toasterService.pop('error','Login Error', 'Cannot contact server. Try again later.')
        
      });
  }

  signup(event) {
    event.preventDefault();
    this._router.navigate(['/signup']);
  }

}
