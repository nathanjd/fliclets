define(['jquery', 'lodash', 'crossroads', 'hasher', 'templates'],
function($, _, router, hasher, templates) {
    var indexRoute = router.addRoute('', function() {
        $('#js-app').html(templates.index());
    });
});