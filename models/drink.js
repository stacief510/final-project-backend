var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user' );

var DrinkSchema = new Schema ({
	name: String,
	store: String,
    review_title: String,
    review: String,
    rating: Number,
    drink_photo: String,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

var Drink = mongoose.model('Drink', DrinkSchema);
module.exports = Drink;

