const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies-controllers');
const {
  createMovieValidation,
} = require('../middlewares/validation');

router.get('', getMovies);
router.post('', createMovieValidation, createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
