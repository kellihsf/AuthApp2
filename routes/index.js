var express = require('express');
var router = express.Router();

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
router.get('/profile', function(req, res, next) {
  res.render('profile');
});



module.exports = router;
