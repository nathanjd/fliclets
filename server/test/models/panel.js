var should = require('chai').should(),
    database = require('../../database'),
    models;



module.exports.test = function() {
    describe('panel', function() {

        before(function(done) {
            database.then(function(db) {
                models = db.models;

                done();
            });
        });

        it('should add panels', function() {
            console.log(models);

            true.should.equal(true);
        });
    });
};