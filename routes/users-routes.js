const router = require('express').Router();

const {
  getUsers,
  updateInfo,
} = require('../controllers/users-controllers');
// const { cardIdValidation, createCardValidation } = require('../middlewares/validation');

router.get('/users/me', getUsers);
router.patch('/users/me', updateInfo);

module.exports = router;
