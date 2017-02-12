'use strict';

const should = require('should');
const dbHelper = require('../db/collection');
const movieUtil = require('../lib/movie');

// init a movie collection
const movies = dbHelper.initCollection('movies', { reset: true });

describe('In `/lib/movie.js`', () => {

  describe('.build()', () => {
    it('should be able to accept an object which contains a `title` and `release_date`', () => {
      const m = movieUtil.build({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.should.have.ownProperty('title');
      m.should.have.ownProperty('release_date');
    });

    // it('should throw an error if `title` or `release_date` is missing');
    it('should return an object containing an auto generated short ID under the `id` key', () => {
      const m = movieUtil.build({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.should.have.ownProperty('id').and.be.type('string');
    });

    it('returned object should also contain an empty array under the key `reviews`', () => {
      const m = movieUtil.build({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.should.have.ownProperty('reviews')
        .and.be.type('object')
        .and.have.ownProperty('length')
        .and.be.eql(0);
    });

    it('should return an object containing the needed methods (`save`, `remove`, `addReview` and `removeReview`)', () => {
      const m = movieUtil.build({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.should.have.ownProperty('save').and.be.type('function');
      m.should.have.ownProperty('remove').and.be.type('function');
      m.should.have.ownProperty('addReview').and.be.type('function');
      m.should.have.ownProperty('removeReview').and.be.type('function');
    });

    it('should NOT save the movie in the database', () => {
      const original = movies.count();

      const m = movieUtil.build({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      movies.count().should.not.be.above(original);
    });
  });

  describe('.create()', () => {
    it('should leverage the build method to initialize the movie object then return it', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.should.have.ownProperty('id');
      m.should.have.ownProperty('title');
      m.should.have.ownProperty('release_date');
      m.should.have.ownProperty('reviews').and.be.type('object').and.have.ownProperty('length');
      m.should.have.ownProperty('save').and.be.type('function');
      m.should.have.ownProperty('remove').and.be.type('function');
      m.should.have.ownProperty('addReview').and.be.type('function');
      m.should.have.ownProperty('removeReview').and.be.type('function');
    });

    it('should save (insert) the movie into the database', () => {
      const original = movies.count();

      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      movies.count().should.be.above(original);
    });
  });

  describe('.find()', () => {
    it('should accept an `id` as a parameter and successfully return the found movie', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      const found = movieUtil.find(m.id);

      found.should.have.ownProperty('id');
      found.should.have.ownProperty('title');
      found.should.have.ownProperty('release_date');
      found.should.have.ownProperty('reviews')
        .and.be.type('object')
        .and.have.ownProperty('length')
        .and.be.eql(0);
    });

    it('should return the built object, must include the instance methods (ex: `addReview`)', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      const found = movieUtil.find(m.id);

      found.should.have.ownProperty('save').and.be.type('function');
      found.should.have.ownProperty('remove').and.be.type('function');
      found.should.have.ownProperty('addReview').and.be.type('function');
      found.should.have.ownProperty('removeReview').and.be.type('function');
    });

    it('should return -1 if the item is not found', () => {
      const m = movieUtil.find('3r14');

      m.should.be.eql(-1);
    });
  });

  describe('movie.save()', () => {
    it('should save the updated object into the database', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.title = 'Life in Pieces';
      m.save();

      const found = movieUtil.find(m.id);
      found.title.should.eql('Life in Pieces');
    });
  });

  describe('movie.remove()', () => {
    it('should successfully remove the item from the database', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      const original = movies.count();

      m.remove();

      original.should.be.above(movies.count());
    });
  });

  describe('movie.addReview()', () => {
    it('should accept as a parameter the `data` object which contains a `reviewer` and `rating` keys', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.addReview({
        reviewer: 'Jane Doe',
        rating: 9
      });
    });

    it('should throw an error, `reviewer must be a string`, if the `reviewer` field is not a string or missing', () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      should(m.addReview).throw(Error);
    });

    it(`should throw an error, 'rating must be a number',
        if the 'rating' field is not a number`, () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      should(m.addReview).throw(Error);
    });

    it(`should successfully add a review, with an autogenerated id,
        to the movie and save it to the database`, () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      const r = m.addReview({
        reviewer: 'Jane Doe',
        rating: 9
      });

      r.should.have.ownProperty('id').and.be.type('string');

      // wait for the data to be updated
      setTimeout(() => {
        should(movieUtil.find(m.id).reviews.length).be.eql(1);
        done();
      });
    });
  });

  describe('movie.removeReview()', () => {
    it(`should accept as a parameter the id of the review to delete,
        and successfully remove a review to the movie`, () => {
      const m = movieUtil.create({
        title: 'Coding Documentary',
        release_date: '2016-12-01'
      });

      m.addReview({
        reviewer: 'Jane Doe',
        rating: 5
      });

      const original = m.reviews.length;
      m.removeReview(m.reviews[0].id);

      original.should.be.above(m.reviews.length);
    });
  });

});
