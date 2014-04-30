define(['models/model'], function(Model) {
    function Panel(data) {
        this.set(data);
    }

    Panel.prototype = Model;

    Media.prototype.apiPath = '/js/api/panel/';

    return Panel;
});