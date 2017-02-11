const shortid = require('shortid');
const dbHelper = require('../db/collection');

// start a `movies` collection if it doesn't exist already
// and get the `find`, `create`, and `remove` methods
// in the returned object
const moviesDB = dbHelper.initCollection('movies', {
  reset: true
});

// Build return an object with the movie methods included
const build = (data) => {
  
};

// Build a movie object then insert it into the database
const create = (data) => {

};

// Build a movie object then insert it into the database
const find = (id) => {

};

module.exports = {
  build,
  create,
  find,
  remove: moviesDB.remove // just a reference
};
