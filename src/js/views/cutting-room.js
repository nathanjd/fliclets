define([
    'jquery', 'templates', 'crossroads', 'when', 'models/storyboard',
    'views/media', 'views/timeline'
],
function($, templates, router, when, Storyboard, mediaWidget, timelineWidget) {
    var emptyRoute,
        route;

    function render(id) {
        var storyboard = new Storyboard({ id: parseInt(id, 10) }),
            $cuttingRoom = $(templates.cutting_room());

        mediaWidget.$el = $cuttingRoom.find('#library');
        mediaWidget.update();

        timelineWidget.$el = $cuttingRoom.find('#workspace');
        timelineWidget.storyboard = storyboard;
        timelineWidget.update();

        $('#js-app').html($cuttingRoom);
    }

    emptyRoute = router.addRoute('/cutting-room', render);

    route = router.addRoute('/cutting-room/{id}', render);

    router.addRoute('/upload-media', function() {
        $('#js-app').html(templates.upload_media());
    });

    router.addRoute('/media-widget', function() {
        mediaWidget.$el = $('#js-app');
        mediaWidget.update();
    });
});