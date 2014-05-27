define(['models/model'], function(Model) {
    function Medium(data) {
        this.set(data);
    }

    Medium.prototype = Model;

    Medium.prototype.apiPath = '/js/api/medium';

    return Medium;
});