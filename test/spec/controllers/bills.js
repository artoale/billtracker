'use strict';

describe('Controller: BillsCtrl', function () {

    // load the controller's module
    beforeEach(module('billtrackerApp'));

    var BillsCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        scope = {};
        BillsCtrl = $controller('BillsCtrl', {
            $scope: scope
        });
    }));

});
