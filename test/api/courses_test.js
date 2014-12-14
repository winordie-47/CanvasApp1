'use strict';

process.env.MONGO_URL = 'mongodb://localhost/courses_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var Courses = require('../../models/courses_model');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

Courses.collection.remove(function(err) {
  if (err) throw(err);
});

describe('the courses test', function() {
  var jwtToken;
  var prereqArr = [];
  var id;

  //creates a user
  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .set({email:'test@example.com', password:'Foobar123'})
    .end(function(err, res) {
      if (err) res.status(500).send('error');
      jwtToken = res.body.jwt;
      console.log('courses test begins');
      console.log(jwtToken);
      done();
    });
  });

  //makes user a teacher
  before(function(done) {
    chai.request(localhost)
    .post('/api/confirmteacher')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      if (err) res.status(500).send('error');
      console.log(res.body);
      done();
    });
  });

  it('should be able to create a course', function(done) {
    chai.request(localhost)
      .post('/api/courses')
      .set({jwt: jwtToken})
      .send({
        name: 'coursename',
        summary: 'stuff',
        schedule: 'today',
        description: 'stuff',
        prereq: prereqArr,
        pass: false
      })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal(Object);
        expect(res.body.pass).to.eql(false);
        expect(res.body.prereq.length).to.eql(0);
        id = res.body.id;
        done();
      });
  });

  it('should be able to edit course info', function(done) {
    chai.request(localhost)
    .put('/api/courses')
    .set({jwt: jwtToken})
    .send({description:'this is a course'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('course info updated');
      done();
    });
  });

  it('should be able to get a course', function(done) {
    chai.request(localhost)
    .get('/api/courses')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('name');
      done();
    });
  });

  it('should be able to delete a course', function(done) {
    chai.request(localhost)
    .delete('/api/courses')
    .set({jwt: jwtToken})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('course removed');
      done();
    });
  });

});
