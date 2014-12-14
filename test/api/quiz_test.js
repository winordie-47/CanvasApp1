'use strict';

process.env.MONGO_URL = 'mongodb://localhost/users_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var Quiz = require('../../models/quiz_model.js');
chai.use(chaihttp);

require('../../server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw(err);
});

describe('all things quiz route', function() {
  var jwtToken;

  before(function(done) {
    chai.request(localhost)
    .post('/api/users')
    .send({username:'test@example.com', password:'foobar123'})
    .end(function(err, res) {
      jwtToken = res.body.jwt;
      done();
    });
  });

  it('should be able to create question and options', function(done) {
    chai.request(localhost)
    .post('api/quiz')
    .set({jwt: jwtToken})
    .send({
      question: 'This is a question',
      type: {
        javascript: 'you like javascript?',
        python: 'You like python?',
        ruby: 'you like ruby?',
        objective: 'you like obj-C?'
      }
    })
    .end(function(err, res) {
      expect(res.body.question).to.have.string('This is a question');
      expect(res.body.type.javascript).to.have.string('you like javascript?');
      expect(res.body.type.python).to.have.string('You like python?');
      expect(res.body.type.ruby).to.have.string('you like ruby?');
      expect(res.body.type.objective).to.have.string('you like obj-C?');
      done();
    });
  });
});
