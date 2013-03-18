'use strict';

xdescribe('Controller: CustomersCtrl', function () {

    // load the controller's module
    beforeEach(module('billtrackerApp'));

    var CustomersCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        scope = {};
        CustomersCtrl = $controller('CustomersCtrl', {
            $scope: scope
        });
    }));
    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
