define(['lodash', 'jquery', 'models/model', 'when'],
function(_, $, Model, when) {
    function Medium(data) {
        this.set(data);
    }

    Medium.prototype = Model.prototype;

    Medium.prototype.apiPath = '/js/api/medium';

    Medium.prototype.getAll = function(options) {
        var deferred = when.defer();

         $.ajax('/api/medium', {
            type: 'GET',
            data: options || {},
            dataType: 'json',
            success: function(media) {
                deferred.resolve(media);
            },
            error: function(jqXHR, textStatus, err) {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    };

    return Medium;
});