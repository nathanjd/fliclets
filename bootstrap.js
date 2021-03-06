var when = require('when'),
    sequence = require('when/sequence'),

    database = require('./server/database'),
    bootstrapData = require('./server/bootstrap_data');

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

function dropModels(db) {
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

function bootstrapModels(db) {
    var tasks = Object.keys(db.models).map(function(key) {
        return bootstrapModel.bind(null, db.models[key]);
    });

    return sequence(tasks);
}


database.then(function(db) {
    console.log('Dropping models...');

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


