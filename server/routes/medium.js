var fs = require('fs'),
    multiparty = require('multiparty'),
    when = require('when'),

    ffmpeg = require('../lib/ffmpeg'),

    db;

function createMedium(attributes) {
    var deferred = when.defer();

    db.models.medium.create(attributes, function(err, medium) {
        if (err) {
             deferred.reject(err);
        } else if (medium) {
            console.log('created medium:', medium.id);
            deferred.resolve(medium);
        } else {
            deferred.reject(new Error('failed to create medium'));
        }
    });

    return deferred.promise;
}

function createThumbnail(medium) {
    var deferred = when.defer(),
        thumbPath = medium.uri;

    console.log('Creating thumbnail medium for medium:', medium.id);

    createMedium({
        type: 'image',
        width: medium.width,
        height: medium.height
    }).then(function(thumbnail) {
        var cwd = process.cwd(),
            mediumPath = cwd + '/' + medium.uri,
            thumbUri = '/media/thumbs/' + thumbnail.id + '.jpg',
            thumbPath = cwd + thumbUri;

        console.log('Creating thumbnail into:', thumbnail.id);

        ffmpeg.thumbnail(mediumPath, thumbPath).then(function(thumbPath) {
            console.log('Thumbnail created', thumbPath);

            thumbnail.uri = thumbUri;

            saveMedium(thumbnail).then(function(thumbnail) {
                console.log('Creating thumnail association');

                medium.setThumbnail(thumbnail, function(err, medium) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(medium);
                    }
                });
            }, deferred.reject);
        }, deferred.reject);
    }, deferred.reject);

    return deferred.promise;
}

function determineMetadata(medium) {
    var deferred = when.defer();

    // determine type of the medium
    medium.type = 'video';

    // determine width and height
    medium.width = 560;
    medium.height = 320;

    // determine duration
    medium.duration = 5;

    deferred.resolve(medium);

    return deferred.promise;
}

function processVideo(medium) {
    var deferred = when.defer(),
        newURI = '/media/' + medium.id + '.avi',
        newPath = process.cwd() + newURI;

    // save file to /media
    fs.rename(medium.uri, newPath, function(err) {
        if (err) {
            deferred.reject(err);
        } else {
            medium.uri = newURI;
            deferred.resolve(medium);
        }
    });

    return deferred.promise;
}

function saveMedium(medium) {
    var deferred = when.defer();

    medium.save(function(err) {
        if (err) {
            deferred.reject(err);
        } else {
            console.log('updated medium:', medium.id);
            deferred.resolve(medium);
        }
    });

    return deferred.promise;
}

module.exports.init = function(server, newDB) {
    console.log('medium init()');

    db = newDB;

    server.param('medium', function(req, res, next, id) {
        // retrieve single
        db.models.medium.get(parseInt(id, 10), function(err, medium) {
            if (err) {
                console.log('failed to retrieve medium:', err);
                next(err);
            } else if (medium) {
                console.log('retrieved medium:', medium.id);
                req.medium = medium;
                next();
            } else {
                console.log('failed to retrieve medium?');
                next(new Error('failed to load medium'));
            }
        });
    });

    // search
    server.get('/api/medium', function(req, res, next) {
        var options = {};

        console.log('starting search of medium', req.query);
        if (req.query) {
            options = req.query;
        }

        db.models.medium.find(options, function(err, media) {
            var json;

            if (err) {
                next(err);
            } else if (media) {
                when.map(media, function(medium) {
                    return medium.toJSON();
                }).then(function(json) {
                    res.json(json);
                }, next);
            } else {
                next(new Error('Failed to retrieve media.'));
            }
        });
    });

    // create
    server.post('/api/medium', function(req, res, next) {
        var form = new multiparty.Form({
            autofiles: true
        });

        console.log('req.files:', req.files);

        form.parse(req, function(err, fields, files) {
            console.log('parsed multipart form', err, fields, files);

            if (err) {
                next(err);
                return;
            }

            if (files.source && files.source.length) {
                console.log('found uploaded files', files);

                fields.uri = files.source[0].path;
            }

            createMedium(fields)
                .then(processVideo, next)
                .then(determineMetadata, next)
                .then(createThumbnail, next)
                .then(saveMedium, next)
                .then(function(medium) {
                    medium.toJSON().then(function(json) {
                        res.json(json);
                    }, next);
                }, next);
        });
    });

    // retrieve
    server.get('/api/medium/:medium', function(req, res, next) {
        console.log('sending medium:', req.medium.id);

        req.medium.toJSON().then(function(json) {
            res.json(json);
        }, next);
    });

    // update
    server.put('/api/medium/:medium', function(req, res, next) {
        var key;

        for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.medium[key] = req.body[key];
            }
        }

        saveMedium(req.medium).then(function(medium) {
            req.medium.toJSON().then(function(json) {
                res.json(json);
            }, next);
        }, next);
    });

    // delete
    server.delete('/api/medium/:medium', function(req, res, next) {
        req.medium.remove(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('deleted medium:', req.medium.id);
                res.send(200);
            }
        });
    });
};