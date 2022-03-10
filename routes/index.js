var express = require('express');
var router = express.Router();
require('dotenv').config()
const isValidToken = require('../middleware/isValidToken')
const axios = require('axios')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// Get with Axios then render to screen
router.get('/', async function (req, res, next) {
  // Get data from remote API 
  // Save as variable
  let config = {
    method: "get",
    url: "https://swapi.dev/api/people/2",
    headers: {},
  }

  const person = await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function(error) {
    console.log(error)
  })
  console.log(person)
  res.render("index", {title: "Star Wars Characters", person})
})

//Login page
router.get('/login', function(req, res, next) {
  res.render('login');
});

// Register page 
router.get('/register', function(req, res, next) {
  res.render('register')
});

// Reference Page
router.get('/reference', async function (req, res, next) {

  let config = {
    method: "get",
    url: 'https://api.openbrewerydb.org/breweries?by_name=bartlett_hall',
    headers: {},
  }

  const brewery = await axios(config)
  .then(function (response) {
    return response.data
  })
  .catch(function(error) {
    console.log(error)
  })
  
  console.log("These are the breweries:", brewery)

  res.render("reference", {title: "List of Breweries", brewery})
})

// Profile page
  router.get('/profile/:id', isValidToken, async function(req, res, next) {
    const {id} = req.params;
  
    const user = await User.findOne({
      where:{
        id: id
      }
    })
  res.render('profile', {name: user.username});
});


module.exports = router;
