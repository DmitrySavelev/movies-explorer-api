const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { auth } = require('../middlewares/auth');
const constants = require('../utils/constants');

const authRouter = require('./auth-router');
const userRoutes = require('./users-routes');
const movieRoutes = require('./movie-routes');

router.use('', authRouter);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => next(new NotFoundError(constants.PAGE_NOT_FOUND)));

module.exports = router;
