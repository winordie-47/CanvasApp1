'use strict';

var mongoose = require('mongoose');

var coursesSchema = mongoose.Schema({
  name: String,
  summary: String,
  schedule: String,
  description: String,
  prereq: [],
  pass: {confirmed: false}
});

module.exports = mongoose.model('courses', coursesSchema);
