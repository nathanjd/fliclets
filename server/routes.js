module.exports.init = function(server, db) {
    console.log('routes.init()');

    require('./routes/medium').init(server, db);
    require('./routes/panel').init(server, db);
    require('./routes/storyboard').init(server, db);
    require('./routes/user').init(server, db);
};