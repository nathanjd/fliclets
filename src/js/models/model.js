define(['jquery', 'when'], function($, when) {
    function Model(data) {
        this.set(data);
    }

    Model.prototype.updated = function() {
        this.createdAt = Date.now();
    };

    Model.prototype.set = function(targetKey, newValue) {
        var key;

        if (typeof targetKey === 'object') {
            // Set all keys in targetKey object.
            for (key in targetKey) {
                if (this.hasOwnProperty(key)) {
                    this[key] = targetKey[key];
                }
            }
        } else {
            // Set single key.
            if (this.hasOwnProperty(targetKey)) {
               this[targetKey] = newValue;
            }
        }
    };

    // Save model to server.
    Model.prototype.push = function() {

    };

    // Get model from server.
    Model.prototype.pull = function(id) {
        var deferred = when.defer(),
            _this = this;

        if (id) {
            this.id = id;
        }

        when($.get(this.prototype.apiPath + this.id + '.json'))
            .then(function(data) {
                var modelKey = _this.constructor.name.toLowerCase();
                _this.set(data[modelKey]);

                deferred.resolve();
            });

        return deferred.promise;
    };

    return Model;
});