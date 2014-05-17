module.exports.init = function(server, db) {
    console.log('medium init()');

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

    });

    // create
    server.post('/api/medium', function(req, res, next) {
        db.models.medium.create(req.body, function(err, medium) {
            if (err) {
                 next(err);
            } else if (medium) {
                console.log('created medium:', medium.id);
                res.json(medium.toJSON());
            } else {
                next(new Error('failed to create medium'));
            }
        });
    });

    // retrieve
    server.get('/api/medium/:medium', function(req, res, next) {
        console.log('sending medium:', req.medium.id);
        res.json(req.medium.toJSON());
    });

    // update
    server.put('/api/medium/:medium', function(req, res, next) {
        var key;

        for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.medium[key] = req.body[key];
            }
        }

        req.medium.save(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('updated medium:', req.medium.id);
                res.json(req.medium.toJSON());
            }
        });
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