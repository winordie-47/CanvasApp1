'use strict';

module.exports = function(app, jwtauth) {
  var User = require('../models/user_model.js');

  //get everyone
  app.get('/api/allusers', function(req, res) {
    User.find(function(err, data) {
      console.log('getting all of the users');
      if (err) return res.status(500).send('error');
      res.json(data);
    });
  });

  //get one person by jwt
  app.get('/api/user', jwtauth, function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).send('error');
      res.json(user);
    });
  });

  //change information
  app.put('/api/users/:_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) return res.status(500).send('error');
      user.name = req.body.name;
      user.save(function(err) {
        if (err) return res.status(500).send('error');
        if (user.teacher === false) {
          res.json({msg: 'student updated'});
        }
        if (user.teacher === true) {
          res.json({msg: 'teacher updated'});
        }
      });
    });
  });

  //delete information
  app.delete('/api/users/:_id', function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err) {
      if (err) return res.status(500).send('error');
      res.json({msg: 'user removed'});
    });
  });
};
