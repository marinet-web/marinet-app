/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ErrorComponent } from './error.component';

describe('Component: Error', () => {
  it('should create an instance', () => {
    let component = new ErrorComponent();
    expect(component).toBeTruthy();
  });
});
