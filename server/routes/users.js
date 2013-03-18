'use strict';
var users = require('../models/model.js')('customers');


var item = {
    get: function (req, res) {
        users.connect();
        users.getItem(req.params.item, function (result) {
            res.json(result);
        });
    },
    put: function (req, res) {
        users.connect();
        users.updateItem(req.params.item, req.body, function (result) {
            res.json(result);
        });
    },
    delete: function (req, res) {
        users.connect();
        users.removeItem(req.params.item, function (result) {
            res.json(result);
        });
    }
};

var collection = {
    get: function (req, res) {
        users.connect();
        console.log(req.query);
        users.getCollection(req.query, function (result) {
            res.json(result);
        });
    },
    post: function (req, res) {
        users.connect();
        console.log(req.body);
        users.create(req.body, function (result) {
            res.json(result);
        });
    },
    delete: function (req, res) {
        users.connect();
        users.removeCollection(function (result) {
            res.json(result);
        });
    }
};

exports.item = item;
exports.collection = collection;
