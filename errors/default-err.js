const { DEFAULT_ERR_CODE } = require('../utils/constants');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DEFAULT_ERR_CODE;
  }
}
module.exports = DefaultError;
