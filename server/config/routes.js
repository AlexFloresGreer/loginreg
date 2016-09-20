console.log("future routes working!");
var path = require('path');
var mongoose = require('mongoose');
var pplwhologin = require('../controllers/users.js');

module.exports = function(app){

  app.post('/login', function(req,res) {
    console.log('got into login route');
    pplwhologin.login(req, res)
  });

  app.post('/register', function(req,res) {
    console.log('got into register route');
    pplwhologin.register(req,res);
  })

}
