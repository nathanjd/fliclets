define(['lodash', 'jquery', 'when', 'models/model'],
function(_, $, when, Model) {
    function User(data) {
        this.set(data);
    }

    User.prototype = _.cloneDeep(Model.prototype);

    User.prototype.apiPath = '/js/api/user';

    return User;
});