'use strict';
var User = require('../models/user_model.js');
var jwt = require('jwt-simple');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jtw || req.body.jwt;

    var decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch(err) {
      console.log(err);
      return res.status(403).send('access denied');
    }

    if(decoded.exp <= Date.now()){
      res.status(500).send('token has expired');
    }

    User.findOne({_id: decoded.iss}, function(err,user){
      if(err) return res.status(403).send('access denied');
      if(!user) return res.status(403).send('access denied');

      req.user = user;
      next();
    });
  };
};
