const status = require('statuses');
const CustomAPIError = require('./custom-error');

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = status('Bad Request');
  }
}

module.exports = BadRequest;
