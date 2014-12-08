'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  username: email,
  userclass: [],
  teacher: false

});

module.exports = mongoose.model('User', userSchema);
