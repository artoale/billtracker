'use strict';
/*jshint camelcase:false*/

describe('Service: bill', function () {

    // load the service's module
    beforeEach(module('billtrackerApp'));

    // instantiate service
    var bill;
    beforeEach(inject(function (_bill_) {
        bill = _bill_;
    }));

    it('should exist', function () {
        expect( !! bill).toBe(true);
    });

    it('should expose a query function', function () {
        expect(bill.query).toBeDefined();
        expect(typeof bill.query).toBe('function');
    });

    describe('query', function () {
        var httpBackend;
        beforeEach(inject(function ($httpBackend){
            httpBackend = $httpBackend;
            httpBackend.expect('GET','/bills')
                .respond(201,[{
                    customer: 'Pinco Pallo',
                    dueDate: new Date(),
                    assignedTo: 'Igor',
                }, {
                    customer: 'Pinco Pallo',
                    dueDate: new Date(),
                    assignedTo: 'Igor',
                }, {
                    customer: 'Pinco Pallo',
                    dueDate: new Date(),
                    assignedTo: 'Igor',
                }]);
        }));

        it('should return an array', function () {
            var result = bill.query();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
            httpBackend.flush();
            expect(result.length).toBe(3);
        });

        it('should have the resource method', function () {
            expect(bill.get).toBeDefined();
            expect(bill.save).toBeDefined();
            expect(bill.query).toBeDefined();
            expect(bill.remove).toBeDefined();
            expect(bill.delete).toBeDefined();
        });

    });

});
