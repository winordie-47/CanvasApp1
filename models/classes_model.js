'use strict';

var mongoose = require('mongoose');

var classesSchema = mongoose.Schema({
  name: String,
  summary: String,
  schedule: String,
  description: String,
  prereq: [],
  pass: false
});

module.exports = mongoose.model('Classes', classesSchema);
