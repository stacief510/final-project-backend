var mongoose = require('mongoose');
const dbb = require('../config/keys').mongoURI;

mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/final-project-backend"||dbb)
    .then((() => console.log('MongoDB connected...')))
    .catch(err => console.log(err));
// DB Config
// const dbb = require('../config/keys').mongoURI;

// Connect to MongoDB (using mLab)
// mongoose.connect(dbb)
//   .then((() => console.log('MongoDB connected...')))
//   .catch(err => console.log(err));

module.exports.Drink = require('./drink.js');
module.exports.User = require('./user.js');