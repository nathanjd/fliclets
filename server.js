// Usage
//   $ node server {port}

var express = require('express'),
    database = require('./server/database'),
    server = express(),
    port = process.argv[2] || 9090;

database.then(function(db) {
    // console.log(db.models);
}, function(err) {
    // console.log('wtf models', err);
});

// Static files route
server.use(express.static(__dirname + '/compiled'));
server.listen(port);

console.log('Server listening on port ' + port);