const jwt = require('jsonwebtoken')
require('dotenv').config()

const isValidToken = (req, res, next) => {
    const token = req.cookies["token"]
    console.log("this token", token)
    if(token) {
      jwt.verify(
        token,
        process.env.SECRET_KEY,
        function(err, decoded){
          if(decoded) {
            console.log("this is the payload with the token", decoded)
            next()
          } else {
            res.redirect('/error')
          }
        }
      )
    }
    else {
      res.redirect('/error')
    }
  }

  module.exports = isValidToken;