console.log("user model is working!");
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {type:String, required: true, trim: true},
  lastname: {type:String, required: true, trim: true},
  email : {type:String, required: true, trim: true, lowercase: true, unique: true},
  bday: {type:String, required: true, trim: true},
  password: {type:String, required: true, trim: true, minlength: 6},
  created_at: Date,
  updated_at: Date
});

mongoose.model('User', UserSchema)
//we don't export anything here -- this is because this file will be run when we require it using our config file and then since the model is defined we'll be able to access it from our controller.
