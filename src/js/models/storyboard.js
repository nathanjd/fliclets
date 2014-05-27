define(['models/model'], function(Model) {
    function Storyboard(data) {
        this.set(data);
    }

    Storyboard.prototype = Model.prototype;

    Storyboard.prototype.apiPath = '/js/api/storyboard';

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