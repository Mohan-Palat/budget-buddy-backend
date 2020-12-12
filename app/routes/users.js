// Require necessary NPM packages
const express = require('express')
const bcrypt = require('bcrypt')

// Require Mongoose Model for User
const User = require('../models/user');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

// NEW USER ROUTE
router.get('/api/users/:id', (req, res) => {
    res.json({
        currentUser: req.params.id,
    })
})

// CREATE A NEW USER
router.post('/api/users', (req, res) => {
    //overwrite the user password with the hashed password, 
    //then pass that in to our database
    req.body.password = bcrypt.hashSync(
        req.body.password, bcrypt.genSaltSync(10)
    )

    User.create(req.body)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new article.
    .then((createdUser) => {
        res.status(201).json({ user: createdUser });
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    });
});

module.exports = router