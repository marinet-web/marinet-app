/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AppsComponent } from './apps.component';

describe('Component: Apps', () => {
  it('should create an instance', () => {
    let component = new AppsComponent(null);
    expect(component).toBeTruthy();
  });
});
