// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require Route Files
const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/users');
const budgetsRouter = require('./app/routes/budgets');


// Instantiate Express Application Object
const app = express();

// Require DB Configuration File
const mongodbURI = require('./config/db');

// Establish Database Connection
mongoose.connect(mongodbURI, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
mongoose.connection.once('open', () => {
  console.log('Budget Bud Connected to Mongo');
});

// Define PORT for the API to run on
const port = process.env.PORT || 5000;

/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

/*** Routes ***/

// Mount imported Routers
app.use(indexRouter);
app.use(usersRouter);
app.use(budgetsRouter);

// Start the server to listen for requests on a given port
app.listen(port, () => {
    console.log(`Budget Buddy listening on port ${port}`);
});