const router = require('express').Router();

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users-controllers');
// const { cardIdValidation, createCardValidation } = require('../middlewares/validation');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUserInfo);

module.exports = router;
