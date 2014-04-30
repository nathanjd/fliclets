define(['models/model'], function(Model) {
    function Media(data) {
        this.set(data);
    }

    Media.prototype = Model;

    Media.prototype.apiPath = '/js/api/media/';

    return Media;
});