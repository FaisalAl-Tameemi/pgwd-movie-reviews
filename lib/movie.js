const shortid = require('shortid');
const db = require('../db');

/**
 * Save the udpates of a movie object
 */
const save = function () {};

/**
 * Remove a movie from the database
 */
const remove = function () {};

/**
 * Add a review to the movie
 */
const addReview = function (rating, reviewer) {
  this.reviews.push({
    id: shortid.generate(),
    rating: rating,
    reviewer: reviewer
  });
  this.save();
};

/**
 * Remove a review from a movie by the review ID
 */
const removeReview = function (review_id) {};

/**
 * Build and save a move into the JSON database
 * Also return an object with the movie methods included
 */
const create = function (data) {
  // build the new movie data object
  const new_movie = {
    id: shortid.generate(),
    title: title,
    release_date: release_date,
    reviews: []
  };

  // TODO: save movie to DB

  // add movie object methods
  new_movie.save = save;
  new_movie.remove = remove;
  new_movie.addReview = addReview;
  new_movie.removeReview = removeReview;

  return new_movie;
};

/**
 * Find a movie by its ID
 */
const find = function (id) {};

module.exports = {
  create,
  find
};
