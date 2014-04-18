define(['templates', 'crossroads'], function(tempaltes, router) {
    var cuttingRoomRoute = router.addRoute('/cutting-room/{id}', function(id) {
        $('#js-app').html(templates.cutting_room({
            
        }));
    });
});