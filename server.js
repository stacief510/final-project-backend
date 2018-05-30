var express = require('express');
var app = express();
const mongoose = require('mongoose');
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const passport = require('passport');
var userRoutes = require('./routes/api/users');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB (using mLab)
mongoose.connect(db)
  .then((() => console.log('MongoDB connected...')))
  .catch(err => console.log(err));


app.use(userRoutes);


let port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log(`Listening on port ${ port }`);
});