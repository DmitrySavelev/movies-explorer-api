const Movie = require('../models/movie-models');
const ValidationError = require('../errors/validation-err'); // 400 некорректный запрос
const ForbiddenError = require('../errors/forbidden-err'); // 403
const NotFoundError = require('../errors/not-found-err'); // 404

const getMovies = (req, res, next) => { // GET /movies'
  Movie
    .find({})
    .then((movies) => {
      res.send({ data: movies });
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
        next(new ValidationError('Переданы некорректные данные при создании фильма'));
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
        throw new NotFoundError('Фильм с указанным movieId не найден ^');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма ^^');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedMovie) => res.send({ deletedMovie }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные фильма ^^^'));
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
