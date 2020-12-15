const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/user')

// get current session
router.get('/api/sessions/currentUser', (req, res) => {
    console.log(req.session)
    res.json({
        currentUser: req.session.currentUser ? req.session.currentUser : null
    })
})

// on sessions form submit (log in)
router.post('/api/sessions/', (req, res) => {
  // username is found and password matches
  // successful log in

  // username is not found - who cares about password if you don't have a username that is found?
  // unsuccessful login

  // username found but password doesn't match
  // unsuccessful login

  // some weird thing happened???????

  // Step 1 Look for the username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
    //   res.send('<a  href="/">Sorry, no user found </a>')
        res.json({
            currentUser: null,
            message: '<a  href="/">Sorry, no user found </a>'
        })
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        // res.redirect('/')
        // return currentUser as json 
        res.json({
            currentUser: foundUser,
            message: 'success'
        })
      } else {
        // passwords do not match
        // res.send('<a href="/"> password does not match </a>')
        // 
        res.json({
            currentUser: null,
            message: '<a href="/"> password does not match </a>'
        })
      }
    }
  })
})

router.delete('/sessions/logout', (req, res) => {
    console.log('logged out')
    req.session.destroy(() => {
        // res.redirect('/')
        res.json({
            currentUser: null,
            message: 'Session expired'
        })
    })
})

module.exports = router