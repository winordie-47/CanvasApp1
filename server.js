'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/canvas_dev');

app.use(bodyparser.json());

require('./routes/index.js')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});
