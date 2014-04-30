define(['templates', 'crossroads', 'when', 'models/storyboard'],
function(tempaltes, router, when, Storyboard) {
    var cuttingRoomRoute = router.addRoute('/cutting-room/{id}', function(id) {
        var storyboard = new Storyboard(1);

        storyboard.pull().then(function() {
            $('#js-app').html(templates.cutting_room({
                storyboard: storyboard
            }));
        });
    });
});