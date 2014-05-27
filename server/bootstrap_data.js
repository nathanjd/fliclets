var when = require('when'),
    sequence = require('when/sequence'),

    database = require('./database'),
    tasks,
    db;

function connect() {
    return database.then(function(newDB) {
        db = newDB;
    });
}

function getEntity(modelName, id) {
    var deferred = when.defer(),
        model = db.models[modelName.toLowerCase()];

    model.get(parseInt(id, 10), function(err, entity) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(entity);
        }
    });


    return deferred.promise;
}

function relate(model, relationships) {
    var tasks = Object.keys(relationships).map(function(modelName) {
        var deferred = when.defer(),
            relationId = relationships[modelName];

        getEntity(modelName, relationId).then(function(entity) {
            model['add' + modelName](entity, function(err) {
                if (err) {
                    console.log(
                        'faled to relate', modelName, relationships[modelName]
                    );
                    deferred.reject(err);
                } else {
                    console.log(
                        'added relationship', modelName, relationships[modelName]
                    );
                    deferred.resolve(true);
                }
            });
        });

        return deferred.promise;
    });

    return sequence(tasks);
}

function create(modelName, attributes, relationships) {
    var deferred = when.defer();

    db.models[modelName].create(function(err, model) {
        if (err) {
            conosle.log(err);
            deferred.reject(err);
        } else {
            console.log('added ' + modelName + model);

            if (relationships) {
                relate(model, relationships).then(function() {
                    deferred.resolve(true);
                }, function(err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(true);
            }
        }
    });

    return deferred.promise();
}

tasks = [
    connect,
    create('medium', {
        name: 'copter',
        type: 'video',
        uri: '/media/copter.ogv',
        width: 560,
        height: 320,
        duration: 5
    }),
    create('medium', {
        name: 'copter',
        type: 'image',
        uri: '/media/copter.jpg',
        width: 560,
        height: 320
    }),
    create('storyboard', {
        name: 'dummy storyboard'
    }),
    create('panel', {
        start: 1,
        end: 3
    }, {
        'Storyboard': 1
    })
];


module.exports = function() {
    console.log('Adding dummy data.');
    return sequence(tasks);
};