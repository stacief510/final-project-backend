var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var usersController = require('./controllers/users');
var drinksController = require('./controllers/drinks');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});
app.get('/', function(req, res){
	res.sendFile('db/seed.js', {root: __dirname});
});

app.get('/users', usersController.index);
app.get('/drinks', drinksController.index);




let port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log(`Listening on port ${ port }`);
});