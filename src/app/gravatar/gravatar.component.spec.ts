/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { GravatarComponent } from './gravatar.component';

describe('Component: Gravatar', () => {
  it('should create an instance', () => {
    let component = new GravatarComponent();
    expect(component).toBeTruthy();
  });
});
