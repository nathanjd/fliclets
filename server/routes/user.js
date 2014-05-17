module.exports.init = function(server, db) {
    console.log('user init()');

    server.param('user', function(req, res, next, id) {
        // retrieve single
        db.models.user.get(parseInt(id, 10), function(err, user) {
            if (err) {
                console.log('failed to retrieve user:', err);
                next(err);
            } else if (user) {
                console.log('retrieved user:', user.id);
                req.user = user;
                next();
            } else {
                console.log('failed to retrieve user?');
                next(new Error('failed to load user'));
            }
        });
    });

    // search
    server.get('/api/user', function(req, res, next) {

    });

    // create
    server.post('/api/user', function(req, res, next) {
        db.models.user.create(req.body, function(err, user) {
            if (err) {
                 next(err);
            } else if (user) {
                console.log('created user:', user.id);
                res.json(user.toJSON());
            } else {
                next(new Error('failed to create user'));
            }
        });
    });

    // retrieve
    server.get('/api/user/:user', function(req, res, next) {
        console.log('sending user:', req.user.id);
        res.json(req.user.toJSON());
    });

    // update
    server.put('/api/user/:user', function(req, res, next) {
        var key;

        for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.user[key] = req.body[key];
            }
        }

        req.user.save(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('updated user:', req.user.id);
                res.json(req.user.toJSON());
            }
        });
    });

    // delete
    server.delete('/api/user/:user', function(req, res, next) {
        req.user.remove(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('deleted user:', req.user.id);
                res.send(200);
            }
        });
    });
};