const express = require('express');
const app = express();
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const User = require('../../models/user');

router.get('/test', (req, res) => res.json({msg: 'Users Endpoint Ok'}));

// app.get('/', function(req, res){
//     res.json({
//       name:"Stacie Fraser",
//       githubUserName: "stacief510",
//       githubLink: "https://github.com/stacief510",
//     })
//   });

// Register
router.post('/register', (req, res) => {
    // Find User by Email
    console.log('received', req.body)
    User.findOne({ email: req.body.email })
      .then(user => {
          // If email already exists, send 400 response
          if (user) {
              console.log('exists')
              return res.status(200).json({ email: 'Email already exists'});
              // If not exists, create new user
          } else {
            console.log('does not exist')

              // Get avatar from Gravatar
              const avatar = gravatar.url(req.body.email, {
                  s: '200',
                  r: 'pg',
                  d: 'mm',
              });

              // Create new user
              const newUser = new User({
                  name: req.body.name,
                  email: req.body.email,
                  current_city: req.body.current_city,
                  avatar,
                  password: req.body.password,
              });

              // Salt and Hash password with bcryptjs, then save new user
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                  })
              })
          }
      })
})

// GET api/users/login (Public)

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // Find User by email
    User.findOne({ email })
      .then(user => {
        // Check for user
        if(!user) {
          return res.status(404).json({ email: 'User not found' })
        }

        bcrypt.compare(password, user.password)
              .then(isMatch => {
                  if(isMatch){
                    const payload = { id: user.id, name: user.name, avatar: user.avatar }
                    
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({ success: true, token: 'Bearer ' + token })
                      });
                  } else {
                      return res.status(400).json({ password: 'Password or email is incorrect' })
                  }
              })
    })
});


//GET api/users/current (Private)
// router.get('/current', passport.authenticate('jwt', { session: false }), (req, res)=>{
//     res.json({
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email,
//         avatar: req.user.avatar,
//     })
// });

module.exports = router;