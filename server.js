// Usage
//   $ node server {port}

var express = require('express'),
    server = express(),

    port = process.argv[2] || 9090,

    database = require('./server/database');

function logger(req, res, next) {
    console.log(req.path, req.params, req.query, req.body);
    next();
}

database.then(function(db) {
    server.use(require('body-parser')());
    server.use(logger);

    // Dynamic routes
    require('./server/routes').init(server, db);

    // Static files route
    server.use(express.static(__dirname + '/compiled'));

    server.listen(port);

    console.log('Server listening on port ' + port);
}, function(err) {
    console.log('Models failed to load:\n', err);
});

