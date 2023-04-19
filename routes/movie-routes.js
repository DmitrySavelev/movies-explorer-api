const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies-controllers');
// const { cardIdValidation, createCardValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/_id', deleteMovie);

module.exports = router;
