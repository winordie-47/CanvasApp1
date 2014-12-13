'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

require('./server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

describe('test the api', function(){
  var jwtToken;

  it('should get a basic route', function(done) {
    chai.request(localhost)
      .get('/')
      .end(function(err,res){
        expect(err).to.eql(null);
        expect(res.body).to.equal(String);
      });
  });

  it('should create a user', function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({"username":"test@example.com","password":"foobar123"});
    .end(function(err,res){
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

  it('should get a user', function(done) {
    chai.request(localhost)
    .get('/api/users')
    .send({jwt:jwtToken});
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('id');
    });
  });

  it('should be able to create a teacher', function(done) {
    chai.request(localhost)
    .get('/api/users')
    .send({"basic":{"teacher":true}});
    .end(function(err,res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('added teacher');
      done();
    });
  });

  it('should be able to remove a teacher', function(done) {
    chai.request(localhost);
    .get('/api/users')
    .send({"basic":{"teacher":true}});
    .end(function(err,res){
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('removed teacher');
      done();
    });
  });

});
