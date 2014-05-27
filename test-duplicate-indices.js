var orm = require('orm'),
    when = require('when'),
    sequence = require('when/sequence'),

    db = orm.connect('sqlite://test.db?debug=true');

function dropModel(model) {
    var deferred = when.defer();

    model.drop(function(err) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(true);
        }
    });

    return deferred.promise;
}

function dropModels() {
    var tasks = Object.keys(db.models).map(function(key) {
        return dropModel.bind(null, db.models[key]);
    });

    return sequence(tasks);
}


function bootstrapModel(model) {
    var deferred = when.defer();

    model.sync(function(err) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(true);
        }
    });

    return deferred.promise;
}

function bootstrapModels() {
    var tasks = Object.keys(db.models).map(function(key) {
        return bootstrapModel.bind(null, db.models[key]);
    });

    return sequence(tasks);
}

db.on('connect', function(err) {
    var A,
        B,
        C;

    A = db.define('a', { name: String });

    B = db.define('b', { name: String });

    C = db.define('c', { name: String });

    A.hasMany('bees', B, {}, { reverse: 'eighs' });
    A.hasMany('cees', C, {}, { reverse: 'eighs' });

    dropModels(db).then(function() {
        console.log('Successfully dropped models.');

        console.log('Bootstrapping models...');

        bootstrapModels(db).then(function() {
            console.log('Successfully bootstrapped models.');
        }, function(err) {
            console.log('Failed to bootsrap models:', err);
        });
    }, function(err) {
        console.log('Failed to drop models:', err);
    });
});