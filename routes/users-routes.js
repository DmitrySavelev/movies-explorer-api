const router = require('express').Router();

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users-controllers');
const { updateUserValidation } = require('../middlewares/validation');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUserValidation, updateUserInfo);

module.exports = router;
