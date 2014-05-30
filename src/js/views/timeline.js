define([
    'jquery', 'templates', 'when', 'models/storyboard', 'models/panel',
    'jquery-ui'
],
function($, templates, when, Storyboard, Panel) {
    var storyboard = new Storyboard(),
        $el;

    function update() {
        var deferred = when.defer();

        storyboard.get().then(function(storyboard) {
            render();

            deferred.resolve();
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function render() {
        var $player = $('#player'),
            player = $player[0],
            $timeline = $(templates.timeline({
                storyboard: storyboard
            })),
            $slider = $timeline.filter('#slider'),
            $storyboard = $timeline.find('#storyboard'),
            $panels = $storyboard.filter('.panel'),
            progressTimeout;

        $el.html($timeline);

        // Enable slider.
        $slider.progressbar({
            value: 0
        }).slider({
            min: 0,
            max: 0.1,
            step: 0.1,
            values: [0,1],
            range: true
            // slide: moveSlider,
            // stop: updateScene
        });

        // Attach player events to slider.

        // Set up droppable area for media.
        $storyboard.droppable({
            accept: '.medium'
        }).sortable({

        });

        $storyboard.on('drop', function(event, ui) {
            var panel,
                media,
                id = parseInt(ui.draggable.attr('id').split('-')[1], 10);

            console.log('dropped!', id, ui);

            // Get medium by id.
            media = window.media.filter(function(medium) {
                return medium.id === id;
            });

            if (media.length) {
                console.log('dropped medium', media[0]);

                // Create a new panel.
                panel = new Panel({
                    medium: media[0]
                });

                // Asssign it to this storyboard.
                storyboard.panels.push(panel);
                render();
            } else {
                // Couldn't find dropped medium.
            }
        });


        // Attach event handlers to each panel.
        storyboard.panels.each(function(panel) {
            var $panel = $panels.find('#panel-' + panel.id);

            $panel.on('click', function() {
                // Activate self.
                $panels.removeClass('active');
                $panel.addClass('active');

                // Mark panel as selected by current user.
                panel.set('selected_by', currentUser);

                // Load video into the player.
                player.src = panel.medium.uri;
                player.load();

                // Seek video to start of panel.
                player.currentTime = panel.start;

                // Keep player and progress bar in sync @ 24 fps.
                if (progressTimeout) {
                    clearTimeout(progressTimeout);
                }
                progressTimeout = setTimeout(function() {
                    $slider.progressbar('option', 'value', player.currentTime);
                }, 42);

                // Load medium into the slider.
                $slider.progressbar('option', 'value', panel.start);
                $slider.progressbar('option', 'max', panel.end);

                $slider.slider('max', panel.medium.duration);
                $slider.slider('values', [panel.start, panel.end]);

                // Attach event handlers to the slider.
                $slider.unbind('slidechange');
                $slider.on('slidechange', function(event, ui) {
                    var handles = $slider.slider('values');

                    panel.set({
                        start: handles[0],
                        end: handles[1]
                    });
                });

                // Seek to the start of this panel.
                player.fastSeek(panel.start);
            });
        });
    }

    return {
        storyboard: storyboard,
        $el: $el,
        update: update,
        render: render
    };
});