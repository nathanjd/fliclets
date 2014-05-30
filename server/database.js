var orm = require('orm'),
    modts = require('orm-timestamps'),
    when = require('when');

var db;

module.exports = when.promise(function(resolve, reject, notify) {
    if (db) {
        resolve(db);
    }

    db = orm.connect('sqlite://test.db?debug=true');

    db.on('connect', function(err) {
        var Medium,
            Storyboard,
            User,
            Panel;

        if (err) {
            throw err;
        }

        db.use(modts, {
            createdProperty: 'created_at',
            modifiedProperty: 'modified_at',
            dbtype: { type: 'date', time: true },
            now: function() { return new Date(); },
            persist: true
        });

        // Medium
        Medium = db.define('medium', {
            name     : String,
            type     : ['video', 'image'],
            duration : Number,
            width    : { type: 'integer' },
            height   : { type: 'integer' },
            uri      : String
        }, {
            methods: {
                self: function() {
                    return '/api/medium/' + this.id;
                },
                toJSON: function() {
                    var thumbnailId = (!this.thumbnail_id) ?
                        null : parseInt(this.thumbnail_id, 10),
                        deferred = when.defer(),
                        json = {
                            id         : parseInt(this.id, 10),
                            name       : this.name,
                            type       : this.type,
                            duration   : this.duration,
                            width      : parseInt(this.width, 10),
                            height     : parseInt(this.height, 10),
                            uri        : this.uri,
                            created_at : this.created_at,
                            updated_at : this.updated_at
                        };

                    if (thumbnailId) {
                        console.log('Searching for thumbnail:', thumbnailId);

                        this.getThumbnail(function(err, thumbnail) {
                            if (err) {
                                deferred.reject(err);
                            } else if(thumbnail) {
                                thumbnail.toJSON().then(function(thumbJSON) {
                                    json.thumbnail = thumbJSON;
                                    deferred.resolve(json);
                                });
                            } else {
                                deferred.reject(
                                    new Error('Failed to get thumbnail')
                                );
                            }
                        });
                    } else {
                        json.thumbnail = null;
                        deferred.resolve(json);
                    }

                    return deferred.promise;
                }
            },
            timestamp: true
        });

        // Panel
        Panel = db.define('panel', {
            start  : Number,
            end    : Number
        }, {
            methods: {
                self: function() {
                    return '/api/panel/' + this.id;
                },
                getThumbnail: function(callback) {
                    this.getMedium(function(err, medium) {
                        if (err) {
                            callback(err);
                        } else if (!medium) {
                            // return default thumbnail
                        } else {
                            // return thumbnail of first panel
                            medium.getThumbnail(callback);
                        }
                    });
                },
                toJSON: function() {
                    var medium_id = (!this.medium_id) ?
                            null : parseInt(this.medium_id, 10),
                        storyboard_id = (!this.storyboard_id) ?
                            null : parseInt(this.storyboard_id, 10),
                        selected_by_id = (!this.selected_by_id) ?
                            null : parseInt(this.selected_by_id, 10);

                    return {
                        id             : parseInt(this.id, 10),
                        start          : this.start,
                        end            : this.end,
                        medium_id      : medium_id,
                        storyboard_id  : storyboard_id,
                        selected_by_id : selected_by_id,
                        created_at     : this.created_at,
                        updated_at     : this.updated_at
                    };
                }
            },
            timestamp: true
        });

        // Storyboard
        Storyboard = db.define('storyboard', {
            name: String
        }, {
            methods: {
                self: function() {
                    return '/api/storyboard/' + this.id;
                },
                getThumbnail: function(callback) {
                    this.getPanels(function(err, panels) {
                        if (err) {
                            callback(err);
                        } else if (!panels.length) {
                            // return default thumbnail
                        } else {
                            // return thumbnail of first panel
                            panels[0].getThumbnail(callback);
                        }
                    });
                },
                toJSON: function() {
                    return {
                        id         : parseInt(this.id, 10),
                        name       : this.name,
                        created_at : this.created_at,
                        updated_at : this.updated_at
                    };
                }
            },
            timestamp: true
        });

        // User
        User = db.define('user', {
            name: String
        }, {
            methods: {
                self: function() {
                    return '/api/user/' + this.id;
                },
                toJSON: function() {
                    return {
                        id         : parseInt(this.id, 10),
                        name       : this.name,
                        created_at : this.created_at,
                        updated_at : this.updated_at
                    };
                }
            },
            timestamp: true
        });

        // Define relationships.
        Medium.hasOne('thumbnail', Medium);

        Panel.hasOne('storyboard', Storyboard, {}, { reverse: 'panels' });
        Panel.hasOne('medium', Medium, {}, { reverse: 'panels' });
        Panel.hasOne('selected_by', User, {}, { reverse: 'selectedPanels' });

        Storyboard.hasMany('media', Medium, {}, { reverse: 'storyboards' });

        User.hasMany('media', Medium, {
            relationship: ['owner', 'collaborator', 'viewer']
        }, { reverse: 'users' });
        User.hasMany('storyboards', {
            relationship: ['owner', 'collaborator', 'viewer']
        }, { reverse: 'users' });

        resolve(db);
    });
});