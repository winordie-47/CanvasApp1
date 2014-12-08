'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

require('./server.js');

var expect = chai.expect;
var localhost = 'http://localhost:3000';

describe('test the api', function(){

  it('should get a basic route', function(done){
    chai.request(localhost)
      .get('/')
      .end(function(err,res){
        expect(err).to.eql(null);
        expect(res.body).to.equal(String);
      });
  });

});
