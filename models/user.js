var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
	email: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    current_city: String,
});

var User = mongoose.model('users', UserSchema);
module.exports = User;

