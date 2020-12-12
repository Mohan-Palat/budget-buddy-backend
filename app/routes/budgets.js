// Require necessary NPM packages
const express = require('express')

// Require Mongoose Model for User
const Budget = require('../models/budget');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /api/budgets
 * Description:   Get All Budgets
 */
router.get('/api/budgets', (req, res) => {
    Budget.find()
    // Return all Budgets as an Array
    .then((allBudgets) => {
        res.status(200).json({ budgets: allBudgets });
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    });
});


/**
 * Action:       CREATE
 * Method:       POST
 * URI:          /api/budgets
 * Description:  Create a new Budget
 */
router.post('/api/budgets', (req, res) => {

    console.log(req.body)
    // TODO - update with current user in session
    currentUser = "5fd438ce9897883dfc205b22"
    req.body.user = currentUser
    console.log(req.body)
    Budget.create(req.body)
    // On a successful `create` action, respond with 201
    // HTTP status and the content of the new budget.
    .then((newBudget) => {
        res.status(201).json({ budget: newBudget });
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    });
});


/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /api/budgets/5fd5148ab6a7cb544e88ffb4
 * Description:   Get An Budget by budget ID
 */
router.get('/api/budgets/:id', (req, res) => {
    Budget.findById(req.params.id)
    .then((budget) => {
        if (budget) {
        res.status(200).json({ budget: budget });
        } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
            error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
            }
        });
        }
    })
    // Catch any errors that might occur
    .catch((error) => {
        res.status(500).json({ error: error });
    })
});


// Export the Router so we can use it in the server.js file
module.exports = router;