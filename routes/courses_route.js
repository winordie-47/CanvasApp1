'use strict';

module.exports = function(app, jwtauth) {
  var Course = require('../models/courses_model');
  var User = require('../models/user_model');

  //creates a course
  app.post('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        var course = new Course({
          name: req.body.name,
          summary: req.body.summary,
          schedule: req.body.schedule,
          description: req.body.description,
          prereq: [],
          pass: {confirmed: false}
        });
        console.log(user.teacher.confirmed);
        course.save(function(err, data) {
          if (err) return res.status(500).send('error');
          console.log(data);
          res.json(data);
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //gets all of the courses
  app.get('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        Course.find(function(err, data) {
          console.log('getting all of the courses');
          if (err) return res.status(500).send('error');
          res.json(data);
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //gets just one course
  app.get('/api/course', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        Course.findOne({_id: req.course._id}, function(err, data) {
          console.log('coursing it up');
          if (err) return res.status(500).send('error');
          res.json(data);
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //changes class info
  app.put('/api/courses', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        Course.findOne({_id: req.course._id}, function(err, course) {
          if (err) return res.status(500).send('error');
          course = {
            name: req.body.name,
            summary: req.body.summary,
            schedule: req.body.schedule,
            description: req.body.description,
            prereq: [],
            pass: {confirmed: false}
          };
          course.save(function(err, data) {
          if (err) return res.status(500).send('error');
          console.log(data);
          res.json({msg: 'course updated'});
        });
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });

  //deletes a course
  app.delete('/api/course', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) res.status(500).send('error');
      if (user.teacher.confirmed === true) {
        Course.remove({_id: req.course._id}, function(err) {
          if (err) return res.status(500).send('error');
          res.json({ msg: 'course removed'});
        });
      } else {
        res.json({msg: 'not a teacher'});
      }
    });
  });
};
