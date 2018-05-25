var db = require('../models');

function index(req, res){
    console.log('GET drink index')
    db.Drink.find({}, function(err, drink){
        if(err){
            res.send(err);
        }
        return res.json(drink);
    });
}

module.exports = {
    index: index,
    // create: create,
    // show: show,
    // userEvents: userEvents
}