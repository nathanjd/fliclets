var orm = require('orm'),
    modts = require('orm-timestamps'),
    when = require('when');

var db;

module.exports = when.promise(function(resolve, reject, notify) {
    if (db) {
        resolve(db);
    }

    db = orm.connect('sqlite://test.db');

    db.on('connect', function(err) {
        var Media,
            Storyboard,
            User,
            Panel;

        if (err) {
            throw err;
        }

        db.use(modts, {
            createdProperty: 'createdAt',
            modifiedProperty: 'modifiedAt',
            dbtype: { type: 'date', time: true },
            now: function() { return new Date(); },
            persist: true
        });

        // Media
        Media = db.define('media', {
            name     : String,
            type     : ['video', 'image'],
            duration : Number,
            width    : { type: 'integer' },
            height   : { type: 'integer' }
        }, {
            methods: {
                uri: function() {
                    return '/api/media/' + this.id;
                }
            },
            timestamp: true
        });

        Media.hasOne('thumbnail', Media);

        // Storyboard
        Storyboard = db.define('storyboard', {
            name: String
        }, {
            methods: {
                uri: function() {
                    return '/api/storyboard/' + this.id;
                },
                thumbnail: function() {
                    if (!this.panels[0]) {
                        // return default thumbnail
                    }

                    return this.panels[0].media.thumbnail();
                }
            },
            timestamp: true
        });

        Storyboard.hasMany('media', Media);
        Storyboard.hasMany('panels', Panel);

        // User
        User = db.define('user', {
            name: String
        }, {
            methods: {
                uri: function() {
                    return '/api/user/' + this.id;
                }
            },
            timestamp: true
        });

        User.hasMany('media', Media);

        // Panel
        Panel = db.define('panel', {
            start  : Number,
            end    : Number,
            height : { type: 'integer' }
        }, {
            methods: {
                uri: function() {
                    return '/api/panel/' + this.id;
                }
            },
            timestamp: true
        });

        Panel.hasOne('thumbnail', Media);
        Panel.hasOne('media', Media);
        Panel.hasOne('selectedBy', User);

        resolve(db);
    });
});