'use strict';

const should = require('should');

describe('Movie (`/lib/movie.js`)', function() {

  describe('#build()', function() {
    it('should be able to accept an object which contains a `title` and `release_date`');
    it('`release_date` must be a date string,  ex: "2016-12-01"');
    it('should throw an error if `title` or `release_date` is missing');
    it('should return an object containing an auto generated short ID under the `id` key');
    it('should return an object containing the `title`, `release_date` and a empty array under the key `reviews`');
    it('should return an object containing the needed methods (`save`, `remove`, `addReview` and `removeReview`)');
    it('should NOT save the movie in the database');
  });

  describe('#create()', function() {
    it('should leverage the build method to initialize the movie object then return it');
    it('should save (insert) the movie into the database');
  });

  describe('#find()', function() {
    it('should accept an `id` as a parameter');
    it('should successfully return the found movie');
    it('should return the built object, must include the instance methods (ex: `addReview`)');
    it('should return -1 if the item is not found');
  });

  describe('#remove()', function() {
    it('should accept an `id` as a parameter');
    it('should successfully remove the item from the database');
  });

  describe('#addReview()', function() {
    it('......'); // TODO: add more tests
    it('should successfully add a review to the movie');
  });

  describe('#removeReview()', function() {
    it('......'); // TODO: add more tests
    it('should accept as a parameter the id of the review to delete');
    it('should successfully remove a review to the movie');
  });

});
