'use strict';

angular.module('billtrackerApp')
    .controller('CustomersCtrl', function ($scope, customer) {
    $scope.customers = customer.getAll();
    $scope.addBill = function addBill(customerObject, newBill) {
        customerObject.addBill(newBill);
    };

    $scope.addCustomer = function addCustomer(newCustomer) {
        customer.add(newCustomer);
    };
});
