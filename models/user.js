var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema ({
    name: String,
    user_name: String,
	email: String,
    password: String,
    current_city: String,
    user_photo: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

