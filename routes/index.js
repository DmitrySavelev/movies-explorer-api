const router = require('express').Router();

const { login, createUser } = require('../controllers/users-controllers');
// const { loginValidation, registerValidation } = require('../middlewares/validation');

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
