var db = require('../models');

var drinks = [{
    name:"vanilla latte",
    store:"Peets Coffee & Tea",
    review_title:"Delicious. Not too sweet",
    review:"This is my favorite drink. The vanilla they use is not too sweet and just adds something to the flavor of the espresso.",
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}]
