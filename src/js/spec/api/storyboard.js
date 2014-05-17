define([
    'chai', 'jquery'
],
function(chai, $) {
    $.ajaxSetup({ async: false });

    function test() {
        var id;

        chai.should();

        describe('storyboard', function() {
            describe('POST /api/storyboard', function() {
                it('should create', function() {
                    $.ajax('/api/storyboard', {
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            name: 'Test storyboard'
                        },
                        success: function(storyboard) {
                            console.log('created storyboard #', storyboard.id, storyboard);
                            storyboard.should.be.an('object');
                            storyboard.should.have.property('id');
                            storyboard.id.should.be.a('number');

                            id = storyboard.id;
                        }
                    });
                });
            });

            describe('GET /api/storyboard/:id', function() {
                it('should retrieve', function() {
                    $.ajax('api/storyboard/' + id, {
                        type: 'GET',
                        dataType: 'json',
                        success: function(storyboard) {
                            storyboard.id.should.equal(id);
                        }
                    });
                });
            });

            describe('PUT /api/storyboard/:id', function() {
                it('should update', function() {
                    $.ajax('/api/storyboard/' + id, {
                        type: 'PUT',
                        dataType: 'json',
                        data: {
                            name: 'Test storyboard 2'
                        },
                        success: function(storyboard) {
                            console.log('updated storyboard #', storyboard.id, storyboard);
                            storyboard.should.be.an('object');
                            storyboard.should.have.property('id');
                            storyboard.name.should.equal('Test storyboard 2');
                        }
                    });
                });
            });

            describe('DELETE /api/storyboard/:id', function() {
                it('should delete', function() {
                    $.ajax('api/storyboard/' + id, {
                        type: 'DELETE',
                        dataType: 'json',
                        complete: function(jqXHR) {
                            jqXHR.status.should.equal(200);
                        }
                    });
                });
            });
        });
    }

    return { test: test };
});