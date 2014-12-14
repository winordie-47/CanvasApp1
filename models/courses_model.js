'use strict';

var mongoose = require('mongoose');

var coursesSchema = mongoose.Schema({
  name: String,
  summary: String,
  schedule: String,
  description: [],
  prereq: [],
  pass: {confirmed: false}
});

module.exports = mongoose.model('Courses', coursesSchema);
