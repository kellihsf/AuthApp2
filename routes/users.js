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

module.exports = router;
