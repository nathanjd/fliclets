define(['models/model'], function(Model) {
    function Panel(data) {
        this.id         = data.id         || null;
        this.media      = data.media      || null;
        this.start      = data.start      || null;
        this.end        = data.end        || null;
        this.selectedBy = data.selectedBy || null;
        this.lastUpdate = data.lastUpdate || 0;
    }

    Panel.prototype = Model;

    return Panel;
});