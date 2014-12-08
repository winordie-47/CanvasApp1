'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/canvas_dev');

app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');

app.use(bodyparser.json());
app.use(passport.initialize());

require('./routes/index.js')(app);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

var canvasRouter = express.Router();
canvasRouter.use(jwtauth);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});
