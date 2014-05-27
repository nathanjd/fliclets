var spawn = require('child_process').spawn;

module.exports.init = function(server, db) {
    console.log('storyboard init()');

    server.param('storyboard', function(req, res, next, id) {
        // retrieve single
        db.models.storyboard.get(parseInt(id, 10), function(err, storyboard) {
            if (err) {
                console.log('failed to retrieve storyboard:', err);
                next(err);
            } else if (storyboard) {
                console.log('retrieved storyboard:', storyboard.id);
                req.storyboard = storyboard;
                next();
            } else {
                console.log('failed to retrieve storyboard?');
                next(new Error('failed to load storyboard'));
            }
        });
    });

    // search
    server.get('/api/storyboard', function(req, res, next) {

    });

    // create
    server.post('/api/storyboard', function(req, res, next) {
        db.models.storyboard.create(req.body, function(err, storyboard) {
            if (err) {
                 next(err);
            } else if (storyboard) {
                console.log('created storyboard:', storyboard.id);
                res.json(storyboard.toJSON());
            } else {
                next(new Error('failed to create storyboard'));
            }
        });
    });

    // retrieve
    server.get('/api/storyboard/:storyboard', function(req, res, next) {
        console.log('sending storyboard:', req.storyboard.id);
        res.json(req.storyboard.toJSON());
    });

    // update
    server.put('/api/storyboard/:storyboard', function(req, res, next) {
        var key;

        for (key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.storyboard[key] = req.body[key];
            }
        }

        req.storyboard.save(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('updated storyboard:', req.storyboard.id);
                res.json(req.storyboard.toJSON());
            }
        });
    });

    // delete
    server.delete('/api/storyboard/:storyboard', function(req, res, next) {
        req.storyboard.remove(function(err) {
            if (err) {
                next(err);
            } else {
                console.log('deleted storyboard:', req.storyboard.id);
                res.send(200);
            }
        });
    });

    // produce storyboard to video
    server.post('/api/storyboard/:storyboard/produce', function(req, res, next) {
        var ffmpeg = spawn('ffmpeg');

        ffmpeg.stdout.on('data', function(data) {
            console.log('ffmpeg stdout:', data);
        });

        ffmpeg.stderr.on('data', function(data) {
            console.log('ffmpeg stderr:', data);
        });
    });
};