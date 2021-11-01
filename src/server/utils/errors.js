class ApplicationError extends Error {
  constructor(message, status, properties) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message ?? 'Something went wrong';

    this.status = status ?? 500;

    this.properties = properties ?? null;
  }

  toJSON() {
    return {
      error: this.message,
      properties: this.properties,
    };
  }
}

class NotFoundError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Not found', properties);

    this.status = 404;
  }
}

class UserInputError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Bad input', properties);

    this.status = 400;
  }
}

class AuthorizationError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Authorization is required', properties);

    this.status = 401;
  }
}

class ForbiddenError extends ApplicationError {
  constructor(message, properties) {
    super(message ?? 'Action is forbidded', properties);

    this.status = 403;
  }
}

module.exports = {
  ApplicationError,
  NotFoundError,
  UserInputError,
  AuthorizationError,
  ForbiddenError,
};
