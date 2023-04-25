const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user-models');

const { NODE_ENV, JWT_SECRET } = process.env;

const ValidationError = require('../errors/validation-err'); // 400 некорректный запрос
const ConflictError = require('../errors/conflict-err'); // 409

const getUserInfo = (req, res, next) => { // GET /users
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const updateUserInfo = (req, res, next) => { // PATCH /users/me
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(id, { name, email }, { returnDocument: 'after', runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Некорректный запрос'));
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
  bcrypt.hash(password, 10)
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
        next(new ValidationError('Переданы некорректные данные пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
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
