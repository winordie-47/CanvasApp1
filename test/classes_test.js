'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

require('./server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

describe('the classes test', function() {
  var jwtToken;
  var prereqArr = [];
  var id;

  it('should be able to create a class', function(done) {
    chai.request(localhost)
      .post('/api/classes')
      //setting header with jwt token determines if user can create a class.
      .set({
        jwt: jwtToken
      })
      .send({
        "name": "classname",
        "summary": "stuff",
        "schedule": "today",
        "description": "stuff",
        "prereq": prereqArr,
        "pass": false
      })
      .end(function(err,res){
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal(Object);
        expect(res.body.pass).to.eql(false);
        expect(res.body.prereq.length).to.eql(0);
        done;
      });
  });

  it('should be able to edit class info', function(done){
    .put('api/classes' + id)
    .set({jwt: jwtToken})
    .send({"description":"this is a class"})
    .end(function(err,res){
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('class info updated');
      done();
    });
  });

  it('should be able to get a class', function(done){
    .get('api/classes')
    .end(function(err,res){
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      done();
    });
  });

  it('should be able to delete a class', function(done){
    .delete('api/classes' + id)
    .end(function(err,res){
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('class removed');
    });
  });

});
