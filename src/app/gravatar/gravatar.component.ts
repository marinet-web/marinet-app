import { Component, OnInit, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  moduleId: module.id,
  selector: 'gravatar',
  
  templateUrl: 'gravatar.component.html',
  styleUrls: ['gravatar.component.css']
})
export class GravatarComponent implements OnInit {
  private _gravatarHost: string = 'http://www.gravatar.com/avatar'
  private _gravatarId: any;

  imageSrc: string;
  @Input() user: any;
  @Input() imageWidth: number;
  @Input() imageHeight: number;

  constructor() {}

  ngOnInit() {
    this.getImageSrc();
  }

  getId() {
    this._gravatarId = Md5.hashStr(this.user.email);
  }

  getImageSrc() {
    this.imageSrc = `${this._gravatarHost}/${this._gravatarId}?s=${this.imageWidth}`;
  }

}
