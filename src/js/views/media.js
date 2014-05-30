define(['jquery', 'templates', 'when', 'models/medium', 'jquery-ui'],
function($, templates, when, Medium) {
    var media = [],
        $el;

    function update() {
        var deferred = when.defer(),
            _this = this;

        Medium.prototype.getAll({type: 'video'}).then(function(media) {
            _this.media = media.filter(function(medium) {
                return medium.type === 'video';
            });

            window.media = _this.media;

            _this.render();
            deferred.resolve();
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function render() {
        var $media = $(templates.media({
            media: this.media
        }));

        this.$el.html($media);

        // attach event handlers
        this.media.forEach(function(medium) {
            var $medium = $media.find('#medium-' + medium.id);

            $medium.draggable({
                helper: 'clone'
            });
        });
    }

    return {
        media: media,
        $el: $el,
        update: update,
        render: render
    };
});