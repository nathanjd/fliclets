define(['chai'], function(chai) {
    chai.should();

    describe('Test', function() {
        it('should pass', function() {
            true.should.equal(true);
        });
    });
});