console.log('users controller inside Controller folder');

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
  return {
    login: function(req,res) {
      console.log("controller: got into login function");
      console.log(req.body);
      User.find({}, function(err,results) {
        if(err) {
          console.log('login function: could not find user');
          res.json({error: "could not find your credentials"});
        }
        else {
          console.log("login function: found users credentials ", results);
          res.json(results);
        }
      });
    },

    register: function(req,res) {
      console.log("transactions: got into register function, req = ", req.body);
      var entry = new User ({ name: req.body.name, lastname: req.body.lastname, email:req.body.email, bday: req.body.bday, password: req.body.password, confpassword: req.body.confpassword, created_at: new Date(), updated_at: new Date() });

      var retVal = entry.save(function(err, result) {
        if(err) {
          console.log('could not add user');
          console.log(err);
          if (err.code = 11000) {
            res.json({duplicate: "email address is in use already!"})
          }
          else {
            res.json({errors: err.errors})
          }
        }
        else {
          console.log("successfully added new user", result);
          res.json(result);
        }
      });
    },



  }//return ends here
}) ();//module.exports ends here
