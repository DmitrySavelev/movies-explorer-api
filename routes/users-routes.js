const router = require('express').Router();

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users-controllers');
const { updateUserValidation } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidation, updateUserInfo);

module.exports = router;
