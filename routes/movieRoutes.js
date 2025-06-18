const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  addMovie,
  updateMovie,
  getMoviesByCategory,
} = require('../controllers/movieController');

router.get('/', getAllMovies);

router.get('/allmovies', getAllMovies);

router.post('/addmovie', addMovie);

router.patch('/update/:id', updateMovie);

router.get('/category/:category', getMoviesByCategory);

module.exports = router;
