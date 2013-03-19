'use strict';
angular.module('billtrackerApp').factory('bubi',


function (data) {
    return data;
});
angular.module('billtrackerApp')
    .factory('interceptorResponse', function ($q) {
    // Service logic
    // ...

    return function (promise) {
        return promise.then(function (response) {
            // console.log('Response recived:', response);
            return response;
        }, function (response) {

            return $q.reject(response);
        });
    };
});



// $provide.factory('myHttpInterceptor', function ($q, dependency1, dependency2) {
//     return function (promise) {
//         return promise.then(function (response) {
//             // do something on success
//         }, function (response) {
//             // do something on error
//             if (canRecover(response)) {
//                 return responseOrNewPromise
//             }
//             return $q.reject(response);
//         });
//     }
// });
