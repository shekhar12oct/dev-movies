const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  addMovie,
  updateMovie,
  getMoviesByCategory,
  searchmovies,
} = require('../controllers/movieController');

router.get('/', getAllMovies);

router.get('/allmovies', getAllMovies);

router.post('/addmovie', addMovie);

router.patch('/update/:id', updateMovie);

router.get('/category/:category', getMoviesByCategory);

router.post('/searchmovies', searchmovies)

module.exports = router;
