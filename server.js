// Usage
//   $ node server {port}

var fileServer = new (require('node-static')).Server('./compiled'),
    http = require('http'),
    port = process.argv[2] || 9090,
    server = http.createServer(function(request, response) {
        request.addListener('end', function() {
            fileServer.serve(request, response);
        }).resume();
    });

server.listen(port);

console.log('Server listening on port ' + port);