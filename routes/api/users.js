const express = require('express');
const app = express();
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
var usersController = require('../../controllers/users');
var drinksController = require('../../controllers/drinks');

const User = require('../../models/user');

router.get('/test', (req, res) => res.json({msg: 'Users Endpoint Ok'}));

app.get('/', function(req, res){
    res.json({
      name:"Stacie Fraser",
      githubUserName: "stacief510",
      githubLink: "https://github.com/stacief510",
    })
  });


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


router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // avatar size option
                    r: 'pg', // avatar rating option
                    d: 'mm', // default avatar option
                  });
            
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                  });

                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                          .then(user => res.json(user))
                          .catch(err => console.log(err));
                    })
                  });
            }
                
        });
});

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
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
    })
});

module.exports = router;