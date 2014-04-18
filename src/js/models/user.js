define(['models/model'], function(Model) {
    function User(data) {
        this.id         = data.id         || null;
        this.name       = data.name       || null;
        this.media      = data.media      || null;
        this.lastUpdate = data.lastUpdate || 0;
    }

    User.prototype = Model;

    return User;
});