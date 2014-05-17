define([
    'chai', 'spec/api/medium', 'spec/api/panel', 'spec/api/storyboard',
    'spec/api/user'
],
function(chai, medium, panel, storyboard, user) {
    chai.should();

    describe('API', function() {
        it('should pass', function() {
            true.should.equal(true);
        });

        medium.test();
        panel.test();
        storyboard.test();
        user.test();
    });
});