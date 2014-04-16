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
        sha1: 'lib/sha1',

        // Unit Testing
        mocha: 'lib/mocha',
        chai: 'lib/chai'
    }
});

// start tests once DOM and scripts are ready
require(['jquery', 'mocha'], function($) {
    $(function() {
        mocha.setup('bdd');
        mocha.checkLeaks();

        require([
            'spec/test'
        ], function() {
            mocha.run();
        });
    });
});
