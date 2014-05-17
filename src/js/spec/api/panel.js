define([
    'chai', 'jquery'
],
function(chai, $) {
    $.ajaxSetup({ async: false });

    function test() {
        var id;

        chai.should();

        describe('panel', function() {
            describe('POST /api/panel', function() {
                it('should create', function() {
                    $.ajax('/api/panel', {
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            start: 2.25,
                            end: 3.6
                        },
                        success: function(panel) {
                            console.log('created panel #', panel.id, panel);
                            panel.should.be.an('object');
                            panel.should.have.property('id');
                            panel.id.should.be.a('number');

                            id = panel.id;
                        }
                    });
                });
            });

            describe('GET /api/panel/:id', function() {
                it('should retrieve', function() {
                    $.ajax('api/panel/' + id, {
                        type: 'GET',
                        dataType: 'json',
                        success: function(panel) {
                            panel.id.should.equal(id);
                        }
                    });
                });
            });

            describe('PUT /api/panel/:id', function() {
                it('should update', function() {
                    $.ajax('/api/panel/' + id, {
                        type: 'PUT',
                        dataType: 'json',
                        data: {
                            start: 1.25,
                            end: 4.6
                        },
                        success: function(panel) {
                            console.log('updated panel #', panel.id, panel);
                            panel.should.be.an('object');
                            panel.should.have.property('id');
                            panel.start.should.equal(1.25);
                            panel.end.should.equal(4.6);
                        }
                    });
                });
            });

            describe('DELETE /api/panel/:id', function() {
                it('should delete', function() {
                    $.ajax('api/panel/' + id, {
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