'use strict';
/*jshint camelcase:false*/

module.exports = function (collection) {
    var Db, Server, db;
    var BSON = require('mongodb').BSONPure;

    var connect = function () {
        Db = require('mongodb').Db;
        Server = require('mongodb').Server;
        db = new Db('billtracker', new Server('127.0.0.1', 27017, {
            auto_reconnect: true,
            poolSize: 4
        }), {
            w: 0,
            native_parser: false
        });
    };

    var getItem = function (id, func) {
        db.open(function (err, db) {
            db.collection(collection, function (err, collection) {
                var oId = new BSON.ObjectID(id);
                console.log(id);
                var cursor = collection.find({
                    '_id': oId
                });
                cursor.nextObject(function (err, results) {
                    console.log(results);
                    func(results);
                    db.close(true, function () {
                        console.log('closing');
                    });
                });
            });
        });
    };

    var getCollection = function (JSONobj, func) {
        var data = {};
        db.open(function (err, db) {
            db.collection(collection, function (err, collection) {
                if (JSONobj) {
                    data = JSONobj;
                }
                collection.find(data).toArray(function (err, results) {
                    func(results);
                    db.close(true, function () {
                        console.log('closing');
                    });
                });
            });
        });
    };


    var create = function (JSONobj, func) {
        var data = {};
        db.open(function (err, db) {
            db.collection(collection, function (err, collection) {

                if (JSONobj) {
                    data = JSONobj;
                } else {
                    func({
                        result: 'emptyObj'
                    });
                    return;
                }
                collection.insert(data, function (err, result) {
                    if (err === null) {
                        func(result[0]);
                    } else {
                        func({
                            result: 'no',
                            msg: err
                        });
                    }
                });
                console.log(JSON.stringify(collection));

            });
        });
    };

    var removeItem = function (id, func) {
        db.open(function (err, db) {
            db.collection(collection, function (err, collection) {
                console.log(id);
                var oId = new BSON.ObjectID(id);
                collection.remove({
                    _id: oId
                }, {
                    w: 1
                },

                function (err, result) {
                    if (err === null) {
                        func({
                            result: 'ok',
                            msg: result
                        });
                    } else {
                        func({
                            result: 'no',
                            msg: err
                        });
                    }
                });

            });
        });
    };
    var removeCollection = function (func) {
        db.open(function (err, db) {
            db.collection(collection, function (err, collection) {
                collection.remove({}, {
                    w: 1
                }, function (err, result) {
                    if (err === null) {
                        func({
                            result: 'ok',
                            msg: result
                        });
                    } else {
                        func({
                            result: 'no',
                            msg: err
                        });
                    }
                });

            });
        });
    };

    var updateItem = function (id, JSONobj, func) {
        var data = '';
        console.log(JSONobj);
        db.open(function (err, db) {
            db.collection(collection, function (err, collection) {
                var oId = new BSON.ObjectID(id);

                if (JSONobj) {
                    data = JSONobj;
                    delete data._id;
                } else {
                    func({
                        result: 'emptyObj'
                    });
                    return;
                }
                collection.update({
                    _id: oId
                }, {
                    $set: data
                }, {
                    safe: true
                }, function (err) {
                    if (err === null) {
                        data._id = oId;
                        func(data);
                    } else {
                        func({
                            result: 'no'
                        });
                    }
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        });
    };

    return {
        connect: connect,
        getItem: getItem,
        getCollection: getCollection,
        create: create,
        removeItem: removeItem,
        removeCollection: removeCollection,
        updateItem: updateItem
    };


};
