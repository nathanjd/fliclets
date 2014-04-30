define(['models/model'], function(Model) {
    function User(data) {
        this.set(data);
    }

    User.prototype = Model;

    Media.prototype.apiPath = '/js/api/user/';

    return User;
});