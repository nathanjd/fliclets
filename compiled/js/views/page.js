define(['jquery', 'lodash', 'crossroads', 'hasher', 'templates'],
function($, _, router, hasher, templates) {
    var pageRoute = router.addRoute('/page/{id}', function(id) {
        $('#js-app').html(templates.index());

        $('#content').html(templates['page_' + id]());

        $('.nav a').removeClass('active');
        $('#page-' + id + '-nav').addClass('active');
    });
});