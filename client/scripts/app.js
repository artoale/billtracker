'use strict';

angular.module('billtrackerApp', ['ngResource'])
    .config(function ($routeProvider) {
    // $httpProvider.responseInterceptors.push('interceptorResponse');

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

    .when('/customers/:customerId', {
        templateUrl: 'views/customerDetails.html',
        controller: 'CustomerDetailsCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });
});
