define(['lodash', 'jquery', 'when'], function(_, $, when) {
    function Model(data) {
        this.set(data);
    }

    // Save model to server.
    Model.prototype.push = function() {

    };

    // Get model from server.
    Model.prototype.pull = function(id) {
        var deferred = when.defer(),
            _this = this,
            apiPath = Object.getPrototypeOf(this).apiPath;

        if (id) {
            this.id = id;
        }

        when($.get(apiPath + '/' + this.id + '.json'))
            .then(function(data) {
                var modelKey = _this.constructor.name.toLowerCase();
                _this.set(data[modelKey]);

                deferred.resolve();
            });

        return deferred.promise;
    };

    Model.prototype.set = function(targetKey, newValue, silent) {
        var key,
            newAtrributes,
            updated = false;

        if (typeof targetKey === 'object') {
            newAtrributes = targetKey;
            silent = newValue;

            // Set all keys in targetKey object.
            for (key in newAtrributes) {
                if (this[key] !== newAtrributes[key]) {
                    updated = true;
                }
                this[key] = newAtrributes[key];
            }
        } else {
            // Set single key.
            if (this[targetKey] !== newValue) {
                updated = true;
            }
           this[targetKey] = newValue;
        }

        // Fire updated function if any values changed.
        if (!silent && updated && typeof this.updated === 'function') {
            this.updated();
        }
    };

    Model.prototype.updated = function() {

    };

    return Model;
});