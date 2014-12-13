'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

require('./server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

User.collection.remove(function(err) {
  if (err) throw(err);
});

describe('the teacher test', function(){
  var jwtToken;
  var id;

  it('should be able to create a teacher', function(done) {
    chai.request(localhost)
    .get('/api/users')
    .set({jwt: jwtAuth})
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
    .set({jwt: jwtAuth})
    .send({"basic":{"teacher":true}});
    .end(function(err,res){
      expect(err).to.eql(null);
      expect(res.body.msg).to.equal('removed teacher');
      done();
    });
  });

})
