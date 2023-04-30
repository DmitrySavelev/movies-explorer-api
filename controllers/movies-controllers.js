const Movie = require('../models/movie-models');
const ValidationError = require('../errors/validation-err'); // 400 некорректный запрос
const ForbiddenError = require('../errors/forbidden-err'); // 403
const NotFoundError = require('../errors/not-found-err'); // 404
const constants = require('../utils/constants');

const getMovies = (req, res, next) => { // GET /movies'
  Movie
    .find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => { // POST /movies
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => { // DELETE /movies/:movieId
  Movie
    .findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(constants.MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(constants.NO_RIGHTS);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedMovie) => res.send({ deletedMovie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
