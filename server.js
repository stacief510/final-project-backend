var express = require('express');
var app = express();
const mongoose = require('mongoose');
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const passport = require('passport');
var userRoutes = require('./routes/api/users');
var usersController = require('./controllers/users');
var drinksController = require('./controllers/drinks');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});


// Auth Routes
app.use(userRoutes);

//index for users
app.get('/users', usersController.index);
//post for users
app.post('/users', usersController.create);
//show for users
app.get('/users/:user_id', usersController.show);
//show user's drinks (aka reviews)
app.get('/users/:user_id/drinks', usersController.userDrinks);

//index for all drinks
app.get('/drinks', drinksController.index);
//post for drinks
app.post('/users/:user_id/drinks', drinksController.create);
//delete drinks (aka review)
app.delete('/users/:user_id/drinks/:drink_id', drinksController.destroy);
//show for one drink
app.get('/users/:user_id/drinks/:drink_id', drinksController.show)
//update a review (aka drink)
app.put('/users/:user_id/drinks/:drink_id', drinksController.update)

app.use(passport.initialize());

require('./config/passport')(passport);




let port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log(`Listening on port ${ port }`);
});