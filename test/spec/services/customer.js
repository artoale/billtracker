'use strict';
/*jshint camelcase:false*/
describe('Service: customer', function () {

    // load the service's module
    beforeEach(module('billtrackerApp'));

    // instantiate service
    var customer;
    beforeEach(inject(function (_customer_) {
        customer = _customer_;
    }));

    it('should be defined', function () {
        expect(customer).toBeDefined();
    });

    describe('addBill', function () {
        var httpBackend;
        var respondCustomers = [{
            '_id': '51461d7c0f294ff5187e3970',
            'name': 'Al Pepito',
            'bills': [{
                'amount': 100,
                'due': '2013-05-10T10:00:00.000Z',
                'payed': false
            }]
        }, {
            '_id': '51461e180f294ff5187e3971',
            'name': 'Alongi',
            'bills': [{
                'amount': 400,
                'due': '2013-03-17T19:48:35.609Z',
                'payed': false
            }]
        }];
        beforeEach(inject(function (_$httpBackend_) {
            httpBackend = _$httpBackend_;
            //console.log(httpBackend);
            httpBackend.expectGET('/customers').respond(respondCustomers);
        }));

        it('should add a bill to the list', function () {
            var customers = customer.getAll();
            httpBackend.flush();
            httpBackend.expectPUT('/customers/51461d7c0f294ff5187e3970').respond(respondCustomers[0]);
            customers[0].addBill({
                amount: 300,
                due: new Date()
            });
            expect(customers[0].bills.length).toBe(2);
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
    describe('getAll', function () {
        var httpBackend;
        var respondCustomers = [{
            '_id': '51461d7c0f294ff5187e3970',
            'name': 'Al Pepito',
            'bills': [{
                'amount': 100,
                'due': '2013-05-10T10:00:00.000Z',
                'payed': false
            }]
        }, {
            '_id': '51461e180f294ff5187e3971',
            'name': 'Alongi',
            'bills': [{
                'amount': 400,
                'due': '2013-03-17T19:48:35.609Z',
                'payed': false
            }]
        }];
        beforeEach(inject(function (_$httpBackend_) {
            httpBackend = _$httpBackend_;
            //console.log(httpBackend);
            httpBackend.expectGET('/customers').respond(respondCustomers);
        }));

        it('should make a single http request', function () {
            customer.getAll();
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            customer.getAll();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should fetch customers', function () {
            var customers = customer.getAll();
            expect(customers).toEqual([]);
            httpBackend.flush();
            expect(customers).toBeSimilarTo(respondCustomers);
        });

        it('should update customer', function () {
            var customers = customer.getAll();
            var response = {
                '_id': '51461d7c0f294ff5187e3970',
                'name': 'Porca Alonga',
                'bills': [{
                    'amount': 100,
                    'due': '2013-05-10T10:00:00.000Z',
                    'payed': false
                }]
            };
            httpBackend.flush();
            httpBackend.expectPUT('/customers/51461d7c0f294ff5187e3970', response).respond(response);
            var modify = customers[0];
            modify.name = 'Porca Alonga';
            modify.$update();
        });
    });

    describe('add', function () {
        var httpBackend;
        var response = {
            name: 'alonga',
            _id: 'aDummyId',
            bills: []
        };
        beforeEach(inject(function (_$httpBackend_) {
            httpBackend = _$httpBackend_;
            //console.log(httpBackend);
            httpBackend.expectPOST('/customers').respond(response);
        }));

        it('should throw if nothing passed', function () {
            expect(function () {
                customer.add();
            }).toThrow('First param must be an object');

        });
        it('should do a POST request', function () {
            customer.add({});
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
        it('should add a customer to the customer list', function () {
            customer.add({
                name: 'alonga'
            });
            expect(customer.customers.length).toBe(1);
            expect(customer.customers[0]).toBeSimilarTo({
                name: 'alonga',
                bills: []
            });
        });

        it('should add to fetched customer the id', function () {
            customer.add({
                name: 'alonga'
            });
            httpBackend.flush();
            expect(customer.customers[0]).toBeSimilarTo(response);
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

    });

    describe('getById', function () {
        var httpBackend;
        beforeEach(inject(function (_$httpBackend_) {
            httpBackend = _$httpBackend_;
            //console.log(httpBackend);
            httpBackend.expectGET('/customers/12345').respond({});
        }));
        it('should make a GET request to /customer/:customerID',function () {
            customer.getById(12345);
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });

});
