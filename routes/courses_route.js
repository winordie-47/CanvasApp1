'use strict';

module.exports = function(app, jwtauth) {
  var Courses = require('../models/courses_model');
  var User = require('../models/user_model');

  //creates a course
  app.post('/api/courses', jwtauth, function(req, res) {
    var courses = new Courses();
    var user = new User();
    User.findOne({_id: req.user._id}, function(err, data) {
      if (err) return res.status(500).send('error');
      if (user.teacher.confirmed === true);
      courses = {
        name: req.body.name,
        description: req.body.description,
        schedule: req.body.schedule
      };
      console.log(data);
      console.log(courses);
      courses.save(function(err, data) {
        if (err) return res.status(500).send('error');
        console.log(data);
        res.json(data);
      });
    });
  });

  //gets all of the courses
  app.get('/api/courses', jwtauth, function(req, res) {
    Courses.find(function(err, data) {
      console.log('getting all of the courses');
      if (err) return res.status(500).send('error');
      res.json(data);
    });
  });

  //gets just one course
  app.get('/api/course', jwtauth, function(req, res) {
    Courses.findOne({_id: req.courses.courses_id}, function(err, data) {
      console.log('coursing it up');
      if (err) return res.status(500).send('error');
      res.json(data);
    });
  });

  //changes class info
  app.put('/api/courses', jwtauth, function(req, res) {
    Courses.findOne({_id: req.courses._id}, function(err, courseinfo) {
      if (err) return res.status(500).send('error');
      courseinfo = {
        name: req.body.name,
        description: req.body.description,
        schedule: req.body.schedule
      };
      courseinfo.summary = function() {
        var newstr = '';
        for (var i = 0; i < 9; i++) {
          newstr += req.body.description[i].length;
        }
        return newstr;
      };
      console.log(courseinfo);
      courseinfo.save(function(err, data) {
        if (err) return res.status(500).send('error');
        res.json(data);
      });
    });
  });

  //deletes a course
  app.delete('/api/courses', jwtauth, function(req, res) {
    Courses.remove({_id: req.body.courses_id}, function(err) {
      if (err) return res.status(500).send('error');
      res.json({ msg: 'course removed'});
    });
  });
};
