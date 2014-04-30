require.config({
    paths: {
        // DOM manipulation and AJAX
        jquery: 'lib/jquery',

        // Routing
        crossroads: 'lib/crossroads',
        signals: 'lib/signals',
        hasher: 'lib/hasher',

        // Templating
        handlebars: 'lib/handlebars.runtime',

        // Utility
        lodash: 'lib/lodash',

        // Amazon S3
        S3Ajax: 'lib/S3Ajax',
        sha1: 'lib/sha1'
    }
});

require([
    'crossroads', 'hasher',  'bucket', 'S3Ajax'
],
function(router, hasher, bucket, S3) {
    // set up s3 library
    //var s3 = new S3(credentials);

    // DEBUG: Log all matched routes.
    router.routed.add(console.log, console);

    // setup hasher
    function parseHash(newHash, oldHash) {
      router.parse(newHash);
    }

    // parse initial hash
    hasher.initialized.add(parseHash);

    // parse hash changes
    hasher.changed.add(parseHash);

    // Load views.
    require([
        'views/index',
        'views/page',
        'views/cutting-room'
    ], function() {
        // start listening for history change
        hasher.init();
    });
});
