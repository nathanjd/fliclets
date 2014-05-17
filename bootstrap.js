var when = require('when'),
    keys = require('when/keys'),

    database = require('./server/database');

function dropModels(db) {
    console.log('Dropping models...');

    return keys.map(db.models, function(model) {
        var deferred = when.defer();

        model.drop(function (err) {
            if (err) {
                deferred.rejct('err');
            } else {
                deferred.resolve(true);
            }
        });

        return deferred.promise;
    });
}

function bootstrapModels(db) {
    console.log('Bootstrapping models...');

    return keys.map(db.models, function(model) {
        var deferred = when.defer();

        model.sync(function (err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(true);
            }
        });

        return deferred.promise;
    });
}


database.then(function(db) {
    dropModels(db).then(function() {
        console.log('Successfully dropped models.');

        bootstrapModels(db).then(function() {
            console.log('Successfully bootstrapped models.');
        }, function(err) {
            console.log('Failed to bootsrap models:', err);
        });
    }, function(err) {
        console.log('Failed to drop models:', err);
    });
});


