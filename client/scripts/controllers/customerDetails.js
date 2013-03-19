'use strict';

angular.module('billtrackerApp')
    .controller('CustomerDetailsCtrl', function ($scope, customer, $routeParams) {
    $scope.customer = customer.getById($routeParams.customerId);
    $scope.toggleForm = function () {
        $scope.billFormShow = !$scope.billFormShow;
    };
    $scope.billFormShow = false;
    $scope.addBill = function addBill(newBill) {
        $scope.customer.addBill(newBill);
        $scope.newBill = {};
    };
    $scope.removeBill = function removeBill(bill) {
        var index = $scope.customer.bills.indexOf(bill);
        $scope.customer.bills.splice(index, 1);
        $scope.customer.$update();
    };

    $scope.markPayed = function markPayed(bill) {
        bill.payed = true;
    };
});
