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

  
  // Export the Router so we can use it in the server.js file
  module.exports = router;