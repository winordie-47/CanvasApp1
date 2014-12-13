'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var User = require('../models/user_model.js');
chai.use(chaihttp);

require('../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw(err);
});

describe('test the api', function() {
  var jwtToken;

  it('should get a basic route', function(done) {
    chai.request(localhost)
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.equal(String);
        done();
      });
  });

  it('should create a user', function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({username:'test@example.com', password:'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwtToken = res.body.jwt;
      console.log(jwtToken);
      done();
    });
  });

  it('should get a user', function(done) {
    chai.request(localhost)
    .get('/api/users')
    .set({jwt: jwtToken})
    .auth({username: 'test@example.com', password:'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

});
