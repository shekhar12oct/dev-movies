const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  addMovie,
  updateMovie,
} = require('../controllers/movieController');

router.get('/allmovies', getAllMovies);

router.post('/addmovie', addMovie);

router.patch('/update/:id', updateMovie);

module.exports = router;
