import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Response } from '@angular/http';

import { TruncatePipe } from '../shared/truncate.pipe';

import { Error, ErrorsService } from './errors.service';

import { CommentComponent } from '../comment';

@Component({
  moduleId: module.id,
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.css'],
  directives: [ROUTER_DIRECTIVES, CommentComponent],
  pipes: [TruncatePipe]
})
export class ErrorComponent implements OnInit {
  name: string;
  hash: string;
  error: Error = <Error>{};
  keys: [string] = <[string]>[];
  solved: boolean;

  constructor(private _errorsService: ErrorsService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.name = params["app"];
      this.hash = params["id"];

      this._errorsService.get(this.hash, this.name)
        .subscribe(error => {
          this.error = error
          //this.keys = this.error.keys;
          //this.solved = error.solved;
        },
        err => alert('Error!'));
    });
  }

  load(key: string) {
    this._errorsService.getById(this.hash, key)
      .subscribe(error => {
        this.error = error;
        //this.solved = error.solved;
        //this.error.selected = key;
      },
      err => alert('Error!'));
  }

  solve() {
    this._errorsService.solve(this.hash, this.name)
    .subscribe((response: Response) => {
      if(response.ok) {
          this.solved = true;
      }
    }, 
    error => alert('Error!'));
  }
}
