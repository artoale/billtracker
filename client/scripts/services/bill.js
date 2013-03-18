'use strict';

angular.module('billtrackerApp')
    .factory('bill', function ($resource) {
    return $resource('/bills');

});
