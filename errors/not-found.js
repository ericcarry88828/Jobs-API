const status = require('statuses');
const CustomAPIError = require('./custom-error');

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status('Not Found');
  }
}

module.exports = NotFoundError;
