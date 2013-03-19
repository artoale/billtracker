'use strict';

angular.module('billtrackerApp')
    .factory('customer', function ($resource) {
    var Customer = $resource('/customers/:customerId', {
        customerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    Customer.prototype.addBill = function (bill) {
        this.bills.push(angular.copy(bill));
        this.$update();
    };

    Customer.prototype.getAddress = function () {
        if (this.street) {
            return this.street;
        }
        return {
            street: 'Via del barbero', //, 12345 - Cuneo (CN)'
            number: '30',
            cap: '12025',
            comune: 'Cuneo',
            provincia: 'CN',
            state: 'Italia'
        };
    };
    var customers = [];

    function getAll() {
        if (customers.length === 0) {
            customers = Customer.query();
        }
        return customers;
    }

    function getById(id) {
        var c = Customer.get({customerId:id});
        return c;
    }

    function add(customer) {
        if (typeof customer !== 'object') {
            throw new Error('First param must be an object');
        }
        if (!customer.bills) {
            customer.bills = [];
        }
        var newCustomer = new Customer(customer);
        customers.push(newCustomer);
        newCustomer.$save();
        return newCustomer;
    }


    return {
        getAll: getAll,
        getById: getById,
        add: add,
        customers: customers
    };
});
