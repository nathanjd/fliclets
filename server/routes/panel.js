module.exports.init = function(server, db) {
    console.log('panel init()');

    server.param('panel', function(req, res, next, id) {
        // retrieve single
        db.models.panel.get(parseInt(id, 10), function(err, panel) {
            if (err) {
                console.log('failed to retrieve panel:', err);
                next(err);
            } else if (panel) {
                console.log('retrieved panel:', panel.id);
                req.panel = panel;
                next();
            } else {
                console.log('failed to retrieve panel?');
                next(new Error('failed to load panel'));
            }
        });
    });

    // search
    server.get('/api/panel', function(req, res, next) {

    });

    // create
    server.post('/api/panel', function(req, res, next) {
        db.models.panel.create(req.body, function(err, panel) {
            if (err) {
                 next(err);
            } else if (panel) {
                console.log('created panel:', panel.id);
                res.json(panel.toJSON());
            } else {
                next(new Error('failed to create panel'));
            }
        });
    });

    // retrieve
    server.get('/api/panel/:panel', function(req, res, next) {
        console.log('sending panel:', req.panel.id);
        res.json(req.panel.toJSON());
    });

    // update
    server.put('/api/panel/:panel', function(req, res, next) {
        var key;

        for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.panel[key] = req.body[key];
            }
        }

        req.panel.save(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('updated panel:', req.panel.id);
                res.json(req.panel.toJSON());
            }
        });
    });

    // delete
    server.delete('/api/panel/:panel', function(req, res, next) {
        req.panel.remove(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('deleted panel:', req.panel.id);
                res.send(200);
            }
        });
    });
};