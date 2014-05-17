var should = require('chai').should(),
    database = require('../../database');

module.exports.test = function() {
    describe('medium', function() {

        before(function(done) {
            database.then(function(db) {
                models = db.models;

                done();
            });
        });

        it('should add medium', function() {
            console.log(models);

            true.should.equal(true);
        });
    });
};