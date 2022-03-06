var express = require('express');
const jwt = require('jsonwebtoken')
var router = express.Router();
require('dotenv').config()
const isValidToken = require('../middleware/isValidToken')
const {User} = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Login page
router.get('/login', function(req, res, next) {
  res.render('login');
});

// Register page 
router.get('/register', function(req, res, next) {
  res.render('register')
});

// Profile page
router.get('/profile', isValidToken, function(req, res, next) {
  res.render('profile', {name: decoded.data});
});


module.exports = router;
