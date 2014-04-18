define(['models/model'], function(Model) {
    function Media(data) {
        this.id         = data.id         || null;
        this.name       = data.name       || null;
        this.type       = data.type       || null;
        this.thumbnail  = data.thumbnail  || null;
        this.duration   = data.duration   || null;
        this.uri        = data.uri        || null;
        this.width      = data.width      || null;
        this.height     = data.height     || null;
        this.lastUpdate = data.lastUpdate || 0;
    }

    Media.prototype = Model;

    return Media;
});