const jsonwebtoken = require('jsonwebtoken');
const AuthDataError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthDataError('Необходима авторизация'));
  }
  const jwt = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthDataError('Необходима авторизация'));
  }
  req.user = payload; // записываем payload в объект запроса
  return next(); // пропускаем запрос дальше
};
module.exports = { auth };
