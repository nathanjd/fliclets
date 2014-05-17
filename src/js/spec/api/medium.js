define([
    'chai', 'jquery'
],
function(chai, $) {
    $.ajaxSetup({ async: false });

    function test() {
        var id;

        chai.should();

        describe('medium', function() {
            describe('POST /api/medium', function() {
                it('should create', function() {
                    $.ajax('/api/medium', {
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            name: 'Test Medium',
                            type: 'image',
                            duration: 10.25,
                            width: 100,
                            height: 100,
                            uri: 'media/copter.jpg',
                            thumbnail_id: 1
                        },
                        success: function(medium) {
                            console.log('created medium #', medium.id, medium);
                            medium.should.be.an('object');
                            medium.should.have.property('id');
                            medium.id.should.be.a('number');

                            id = medium.id;
                        }
                    });
                });
            });

            describe('GET /api/medium/:id', function() {
                it('should retrieve', function() {
                    $.ajax('api/medium/' + id, {
                        type: 'GET',
                        dataType: 'json',
                        success: function(medium) {
                            medium.id.should.equal(id);
                        }
                    });
                });
            });

            describe('PUT /api/medium/:id', function() {
                it('should update', function() {
                    $.ajax('/api/medium/' + id, {
                        type: 'PUT',
                        dataType: 'json',
                        data: {
                            name: 'Test Medium 2',
                            type: 'image',
                            duration: 15,
                            width: 200,
                            height: 200,
                            uri: 'media/copter.jpg',
                            thumbnail_id: 2
                        },
                        success: function(medium) {
                            console.log('updated medium #', medium.id, medium);
                            medium.should.be.an('object');
                            medium.should.have.property('id');
                            medium.id.should.equal(id);
                            medium.width.should.equal(200);
                        }
                    });
                });
            });

            describe('DELETE /api/medium/:id', function() {
                it('should delete', function() {
                    $.ajax('api/medium/' + id, {
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