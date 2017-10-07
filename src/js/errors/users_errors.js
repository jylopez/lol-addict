'use strict';
const { createError } = require('../helpers/errors_helpers');

const UsersErrors = {
  EmailAlreadyExists: createError('UserEmailAlreadyExistsError', () => 'An account with this email already exists')
};

module.exports = UsersErrors;