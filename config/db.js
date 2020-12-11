// Creating a base name for the MongoDB
const mongooseBaseName = 'budget-buddy';

// Create the MongoDB URI for Development and Test
const database = {
    MONGODB_URI: `mongodb://localhost/${mongooseBaseName}`
};

// Identify if development environment is Test or Development
// select DB based on wether a test file was executed before `server.js`
// const localDB = process.env.TESTENV ? database.test : database.development;

// Environment variable MONGODB_URL will be available in
// Heroku production environment, otherwise use Test or Development DB
const currentDB = process.env.MONGODB_URI || database.MONGODB_URI;

// Export the appropriate database based om the current environment
module.exports = currentDB;
