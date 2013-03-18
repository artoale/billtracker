'use strict';

angular.module('billtrackerApp')
    .controller('BillsCtrl', function ($scope, bill) {

    bill.add({

    });
    $scope.bills = bill.query();
});
