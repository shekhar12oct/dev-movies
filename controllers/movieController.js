const Movie = require('../models/movieModel');

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const addMovie = async (req, res) => {
  try {
    const { title, category, img } = req.body;
    const newMovie = new Movie({ title, category, img });
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  updateMovie,
};
