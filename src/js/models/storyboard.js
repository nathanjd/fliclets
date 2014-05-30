define(['lodash', 'jquery', 'when', 'models/model'],
function(_, $, when, Model) {
    function Storyboard(data) {
        this.set.apply(this, [data, true]);

        if (this.panels) {
            this.panels = this.panels.map(function(panel) {
                return new Panel(panel);
            });
        }
    }

    Storyboard.prototype = _.cloneDeep(Model.prototype);

    Storyboard.prototype.apiPath = '/js/api/storyboard';

    Storyboard.prototype.get = function() {
        var _this = this,
            deferred = when.defer();

        function success(storyboard) {
            storyboard.id = parseInt(storyboard.id, 10);

            _this.set(storyboard, true);

            deferred.resolve(storyboard);
        }

        function error(jqXHR, textStatus, err) {
            deferred.reject(err);
        }

        if (this.id) {
            $.ajax('api/storyboard/' + this.id, {
                type: 'GET',
                dataType: 'json',
                success: success,
                error: error
            });
        } else {
            $.ajax('api/storyboard', {
                type: 'POST',
                dataType: 'json',
                success: success,
                error: error
            });
        }

        return deferred.promise;
    };

    Storyboard.prototype.addPanel = function(panel, index) {
        if (index === undefined) {
            index = this.panels.length;
        }

        if (index >= 0) {
            this.panels.splice(index, 0, panel);
            this.updated();
        }
    };

    Storyboard.prototype.removePanel = function(panelOrIndex) {
        var index;

        if (isNaN(panelOrIndex)) {
            // Find and remove given panel.
            index = this.panels.indexOf(panelOrIndex);
        } else {
            // Remove panel at specific index.
            index = panelOrIndex;
        }

        if (index >= 0) {
            this.panels.splice(index, 1);
            this.updated();
        }
    };

    Storyboard.prototype.setName = function(newName) {
        if (typeof newName !== 'string' || !newName.length) {
            return;
        }

        this.name = newName;
        this.updated();
    };

    return Storyboard;
});