define([
    'chai', 'jquery'
],
function(chai, $) {
    $.ajaxSetup({ async: false });

    function test() {
        var id;

        chai.should();

        describe('user', function() {
            describe('POST /api/user', function() {
                it('should create', function() {
                    $.ajax('/api/user', {
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            name: 'Test user'
                        },
                        success: function(user) {
                            console.log('created user #', user.id, user);
                            user.should.be.an('object');
                            user.should.have.property('id');
                            user.id.should.be.a('number');

                            id = user.id;
                        }
                    });
                });
            });

            describe('GET /api/user/:id', function() {
                it('should retrieve', function() {
                    $.ajax('api/user/' + id, {
                        type: 'GET',
                        dataType: 'json',
                        success: function(user) {
                            user.id.should.equal(id);
                        }
                    });
                });
            });

            describe('PUT /api/user/:id', function() {
                it('should update', function() {
                    $.ajax('/api/user/' + id, {
                        type: 'PUT',
                        dataType: 'json',
                        data: {
                            name: 'Test user 2'
                        },
                        success: function(user) {
                            console.log('updated user #', user.id, user);
                            user.should.be.an('object');
                            user.should.have.property('id');
                            user.name.should.equal('Test user 2');
                        }
                    });
                });
            });

            describe('DELETE /api/user/:id', function() {
                it('should delete', function() {
                    $.ajax('api/user/' + id, {
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