const status = require('statuses');
const CustomAPIError = require('./custom-error');

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status('Unauthorized');
  }
}

module.exports = UnauthenticatedError;
