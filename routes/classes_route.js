'use strict';

module.exports = function(app, jwtauth){
  var Classes = require('./models/classes_model.js');

  //creates a class
  app.post('/api/classes', jwtauth, function(res, res) {
    var classes = new Classes();
    classes = {
      name: req.body.name,
      description: req.body.description,
      schedule: req.body.schedule
    };
    classes.summary = function() {
      var newstr = "";
      for(var i = 0; i < 9; i++) {
        newstr += req.body.description[i].length;
      }
      return newstr;
    };
    console.log(classes);
    classes.save(function(err, data) {
      if (err) return res.status(500).send(error);
      res.json({msg: 'class created'});
    });
  });

  //gets all of the classes
  app.get('/api/classes', jwtauth, function(req, res) {
    Classes.find(function(err, data) {
      console.log('getting all of the classes');
      if (err) return res.status(500).send('error');
      res.json(data);
    });
  });

  //gets just one class
  app.get('/api/class', jwtauth, function(req, res) {
    Classes.findOne({_id: req.body.classes_id}, function(req, res) {
      console.log('classing it up');
      if (err) return res.status(500).send('error');
      res.json(data);
    });
  });

  //changes class info
  app.put('/api/classes', jwtauth, function(req, res) {
    Classes.findOne({_id: req.body.classes_id}, function(err, classinfo) {
      if (err) return res.status(500).send('error');
      classinfo = {
        name: req.body.name,
        description: req.body.description,
        schedule: req.body.schedule
        }
      classes.summary = function() {
        var newstr = "";
        for(var i = 0; i < 9; i++) {
          newstr += req.body.description[i].length;
        }
        return newstr;
      };
    });
  });

  //deletes a class
  app.delete('/api/classes', jwtauth, function(req, res) {

  });
}
