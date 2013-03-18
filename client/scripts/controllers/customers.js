'use strict';

angular.module('billtrackerApp')
    .controller('CustomersCtrl', function ($scope, customer) {
    $scope.customers = customer.getAll();
    $scope.addBill = function addBill(customer, newBill) {
        customer.addBill(newBill);
    };

    $scope.addCustomer = function addCustomer(newCustomer) {
        customer.add(newCustomer);
    };
});
