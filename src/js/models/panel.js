define(['lodash', 'jquery', 'when', 'models/model'],
function(_, $, when, Model) {
    function Panel(data) {
        this.set(data);
    }

    Panel.prototype = _.cloneDeep(Model.prototype);

    Panel.prototype.apiPath = '/js/api/panel';

    Panel.prototype.get = function() {
        var _this = this,
            deferred = when.defer();

        $.ajax('api/panel/' + id, {
            type: 'GET',
            dataType: 'json',
            success: function(panel) {
                _this.set(panel, true);
                deferred.resolve(_this);
            },
            error: function(jqXHR, textStatus, err) {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    };

    Panel.prototype.updated = function() {

    };

    return Panel;
});