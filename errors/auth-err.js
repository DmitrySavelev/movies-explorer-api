const { UNAUTHORIZED_ERR_CODE } = require('../utils/constants');

class AuthDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERR_CODE;
  }
}
module.exports = AuthDataError;
