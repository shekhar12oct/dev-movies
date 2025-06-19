const Movie = require('../models/movieModel');

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

const addMovie = async (req, res) => {
  try {
    const data = req.body;

    // Check if multiple movies are being added
    if (Array.isArray(data)) {
      const movies = await Movie.insertMany(data); // bulk insert
      res.status(201).json({ message: 'Movies added successfully', movies });
    } else {
      // Single movie
      const { title, category, img } = data;
      const newMovie = new Movie({ title, category, img });
      await newMovie.save();
      res
        .status(201)
        .json({ message: 'Movie added successfully', movie: newMovie });
    }
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

const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const movies = await Movie.find({
      category: new RegExp(`^${category}$`, 'i'), // case-insensitive match
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchmovies = async (req, res) => {
  try {
    const {input} = req.body;

    // Case-insensitive partial match on title
    const movies = await Movie.find({
      title:{$regex:'^' + input, $options:'i'}
    })

    if(movies.length===0){
      return res.status(200).json({ message: 'No matching movies found.' });
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  updateMovie,
  getMoviesByCategory,
  searchmovies,
};
