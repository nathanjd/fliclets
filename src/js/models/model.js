define([], function() {
    function Model(data) {
        this.id         = data.id         || null;
        this.lastUpdate = data.lastUpdate || 0;
    }

    Model.prototype.updated = function() {
        this.lastUpdate = Date.now();
    };

    // Save storyboard to server.
    Model.prototype.save = function() {

    };

    // Update storyboard from server.
    Model.prototype.update = function() {

    };

    return Model;
});