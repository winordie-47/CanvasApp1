'use strict';

module.exports = function(app,jwtToken) {
  var User = require('./models/user_model.js');

  app.get('api/users', jwtToken, function(req, res) {
    User.find(function(err, data) {
      if(err) return res.status(500).send('error');
      res.json(data);
    });
  });

  app.get('/api/users/:_id', jwtToken, function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) return res.status(500).send('error');
      res.json(user);
    });
  });

  app.put('/api/users/:_id', jwtToken, function(req, res) {
    User.findById(req.params.user_id, function(err, user){
      if(err) return res.status(500).send('error');
      user.name = req.body.name;
      user.save(function(err) {
      if(err) return res.status(500).send('error');
      if(user.teacher === false) {
        res.json({msg: 'student updated'});
      }
      if(user.teacher === true) {
        res.json({msg: 'teacher updated'});
      }
      });
    });
  });

  app.delete('/api/users/:_id', jwtToken, function(req, res) {
    User.remove({_id: req.params.user_id}, function(err) {
      if(err) return res.status(500).send('error');
      res.json({msg: 'user removed'});
    });
  });
};
