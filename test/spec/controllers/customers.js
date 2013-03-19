'use strict';

describe('Controller: CustomersCtrl', function () {

    // load the controller's module
    beforeEach(module('billtrackerApp'));

    var CustomersCtrl,
    scope, customerService,customerObj;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        customerService = {
            getAll: function () {
                return [];
            },
            add: function () {

            }
        };
        customerObj = {
            addBill: function () {}
        };
        spyOn(customerService,'getAll').andCallThrough();
        spyOn(customerObj,'addBill');
        CustomersCtrl = $controller('CustomersCtrl', {
            $scope: scope,
            customer: customerService
        });
    }));

    it('should attach a things to the scope', function () {
        expect(scope.customers).toBeDefined();
        expect(scope.addBill).toBeDefined();
        expect(scope.addCustomer).toBeDefined();
    });

    it('should call customer.getAll()', function () {
        expect(customerService.getAll).toHaveBeenCalled();
    });

    describe('addBill', function () {
        it('should call addBill to the customer object', function () {
            scope.addBill(customerObj, {});
            expect(customerObj.addBill).toHaveBeenCalled();
        });
    });

    describe('addBill', function () {
        it('should call addBill to the customer object', function () {
            spyOn(customerService,'add');
            scope.addCustomer({});
            expect(customerService.add).toHaveBeenCalled();
        });
    });
});
