module.exports.regex = /^https?:\/\/(www.)?[-a-z0-9:%._+~#=]{1,}\.[a-z0-9()]{1,}([-a-z0-9()\-._~:/?#[\]@!$&'()*+,;=]*)/i;

module.exports.VALIDATION_ERR_CODE = 400;
module.exports.UNAUTHORIZED_ERR_CODE = 401;
module.exports.FORBIDDEN_ERR_CODE = 403;
module.exports.NOT_FOUND_ERR_CODE = 404;
module.exports.CONFLICT_ERR_CODE = 409;
module.exports.DEFAULT_ERR_CODE = 500;

module.exports.PAGE_NOT_FOUND = 'Страница не найдена';
module.exports.USER_NOT_FOUND = 'Пользователь не найден';
module.exports.USER_EXISTS = 'Этот пользователь уже существует';
module.exports.MOVIE_NOT_FOUND = 'Фильм не найден';
module.exports.NO_RIGHTS = 'Вы не можете удалить фильм другого пользователя';
module.exports.AUTH_ERROR = 'Неправильная почта или пароль';
module.exports.AUTH_REQUIRED = 'Требуется авторизация';
module.exports.TOKEN_WRONG_TYPE = 'Некорректный тип токена';

module.exports.SAULT_NUMBER = 10;
