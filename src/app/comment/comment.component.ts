import { Component, OnInit, Input } from '@angular/core';
import { Auth } from '../shared/auth';

import { GravatarComponent } from '../gravatar';
import { CommentService, Comment } from './comment.service';

@Component({
  moduleId: module.id,
  selector: 'comments',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.css'],
  directives: [GravatarComponent]
})
export class CommentComponent implements OnInit {
  @Input() hash: string;
  user: any;
  comments: [Comment] = <[Comment]>[];
  message: string = '';

  constructor(private _auth: Auth,
    private _commentService: CommentService) { }

  ngOnInit() {
    this.user = this._auth.getUser();
    this.find();
  }

  send() {
    this._commentService.comment(<Comment>{
      errorHash: this.hash,
      message: this.message,
      userEmail: this.user.email,
      userRole: this.user.name,
      userName: this.user.name
    }).subscribe(response => {
      if (response.ok) {
        this.message = '';
        this.find();
      }
    },
      err => alert('Error!'));
  }

  find() {
    this._commentService.find(this.hash).subscribe(
      comments => this.comments = comments,
      err => alert('Error!'));
  }

}
