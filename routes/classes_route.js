'use strict';

module.exports = function(app, jwtauth){
  var Classes = require('./models/classes_model.js');
  
  //creates a class
  app.post('/api/classes', jwtauth, function(res, res) {

  });

  //gets all of the classes
  app.get('/api/classes', jwtauth, function(req, res) {

  });

  //gets just one class
  app.get('/api/class', jwtauth, function(req, res) {

  });

  //changes class info
  app.put('/api/classes', jwtauth, function(req, res) {

  });

  //deletes a class
  app.delete('/api/classes', jwtauth, function(req, res) {

  });
}
