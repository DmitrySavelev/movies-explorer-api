const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies-controllers');
const {
  createMovieValidation,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
