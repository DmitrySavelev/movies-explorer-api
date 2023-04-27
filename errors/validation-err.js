const { VALIDATION_ERR_CODE } = require('../utils/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERR_CODE;
  }
}

module.exports = ValidationError;
