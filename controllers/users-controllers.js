const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user-models');
const constants = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const ValidationError = require('../errors/validation-err'); // 400 некорректный запрос
const ConflictError = require('../errors/conflict-err'); // 409
const NotFoundError = require('../errors/not-found-err'); // 404

const getUserInfo = (req, res, next) => { // GET /users
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(constants.USER_NOT_FOUND);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => { // PATCH /users/me
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError(constants.USER_EXISTS));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => { // POST /signup
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, constants.SAULT_NUMBER)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError(constants.USER_EXISTS));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => { // POST /signin,
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({
        token,
      });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
