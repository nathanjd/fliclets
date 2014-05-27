define(['models/model'], function(Model) {
    function User(data) {
        this.set(data);
    }

    User.prototype = Model;

    User.prototype.apiPath = '/js/api/user';

    return User;
});