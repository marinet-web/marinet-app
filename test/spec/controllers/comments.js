'use strict';

describe('Controller: CommentsCtrl', function () {

    // load the controller's module
    beforeEach(module('marinetApp'));

    var CommentsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        CommentsCtrl = $controller('CommentsCtrl', {
            $scope: scope
        });
    }));

    it('just testing', function () {
        expect(1).toBe(1);
    });
});
