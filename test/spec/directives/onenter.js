'use strict';

describe('Directive: onEnter', function () {

    // load the directive's module
    beforeEach(module('marinetApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('just testing', function () {
        expect(1).toBe(1);
    });
});
