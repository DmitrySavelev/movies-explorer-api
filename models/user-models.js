const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const constants = require('../utils/constants');
const AuthError = require('../errors/auth-err'); // 401 не авторизован

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(constants.AUTH_ERROR);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(constants.AUTH_ERROR);
          }
          return user;
        })
        .catch(next);
    });
};

module.exports = mongoose.model('user', userSchema);
