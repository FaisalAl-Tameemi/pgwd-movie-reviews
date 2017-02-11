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
  return {
    id: shortid.generate(),
    title: data.title,
    release_date: data.release_date,
    reviews: [],
    save: function() {
      moviesDB.update(this.id, this);
    },
    remove: function() {
      moviesDB.remove(this.id);
    },
    addReview: function(data) {
      this.reviews.push(data);
      this.save();
    },
    removeReview: function(review_id) {
      const review_index = _.findIndex(this.reviews, { id: review_id });

      // if the review is not found, return -1
      if (review_index === -1) {
        return -1;
      }

      this.reviews.splice(review_index, 1);
      return this.reviews;
    }
  };
};

// Build a movie object then insert it into the database
const create = (data) => {
  // build a movie object
  const new_movie = build(data);
  // save the movie into the datbase
  moviesDB.insert(new_movie);
  // return the built movie
  return new_movie;
};

// Build a movie object then insert it into the database
const find = (id) => {
  const found = moviesDB.find(id);

  // if the movie is found, build it to add the extra review methods
  if (found) {
    return build(found);
  }

  return -1;
};

module.exports = {
  build,
  create,
  find,
  remove: moviesDB.remove // just a reference
};
