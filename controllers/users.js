var db = require('../models');

function index(req, res){
    console.log('GET user index')
    db.User.find({}, function(err, user){
        if(err){
            res.send(err);
        }
        return res.json(user);
    });
}

module.exports = {
    index: index,
    // create: create,
    // show: show,
    // userEvents: userEvents
}