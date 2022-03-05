var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const {User} = require('../models')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user
router.post('/register', async (req, res) => {
  const {username, password, email} = req.body // req.body.username req.body.password req.body.email
  const hash = bcrypt.hashSync(password, saltRounds)

  const user = await User.create({
    username: username,
    password: hash,
    email: email
  })
  res.json({
    id: user.id,
    username: user.username
  })
})

// Log in as user
router.post('/login', async (req, res) => {
  const {username, password} = req.body // req.body.username req.body.password req.body.email

  const user = await User.findOne({
    where: {
      username: username
    }
  })

  if(user){
    // takes our user input password from re.body, uses bcrypt to hash it and checks that the hash is the same as the already hashed password in our DB
    const comparePass = bcrypt.compareSync(password, user.password)
    if(comparePass === true) {
      
    res.redirect('/profile')
    } else {
      res.send("Wrong password")
    }

  } else {
    res.send("No user found")
  }
  })


module.exports = router;
