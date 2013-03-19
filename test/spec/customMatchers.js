'use strict';
beforeEach(function () {
    this.addMatchers({

        toBeSimilarTo: function (expected) {
            var actual = JSON.stringify(this.actual);
            var notText = this.isNot ? ' not' : '';

            this.message = function () {
                return 'Expected ' + actual + notText + ' to be similar to ' + expected;
            };

            return actual === JSON.stringify(expected);
        }

    });
});

