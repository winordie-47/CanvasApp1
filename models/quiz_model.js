'use strict';

var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
  question: String,
  type: {
    javascript: 'j',
    python: 'p',
    ruby: 'r',
    objective: 'o'
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
