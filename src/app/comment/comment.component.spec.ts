/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CommentComponent } from './comment.component';

describe('Component: Comment', () => {
  it('should create an instance', () => {
    let component = new CommentComponent(null, null);
    expect(component).toBeTruthy();
  });
});
