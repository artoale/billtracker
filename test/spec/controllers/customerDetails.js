'use strict';

xdescribe('Controller: CustomerDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('billtrackerApp'));

  var CustomerDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    CustomerDetailsCtrl = $controller('CustomerDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
