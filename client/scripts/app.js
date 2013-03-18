'use strict';

angular.module('billtrackerApp', ['ngResource'])
    .config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
        .when('/bills', {
        templateUrl: 'views/bills.html',
        controller: 'BillsCtrl'
    })
        .when('/customers', {
          templateUrl: 'views/customers.html',
          controller: 'CustomersCtrl'
        })
        .otherwise({
        redirectTo: '/'
    });
});
