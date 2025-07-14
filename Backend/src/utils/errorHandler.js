const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { serverConfig } = require('./constant');

class AppError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, extras = {}) {
    super(message || getReasonPhrase(statusCode));

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 0 : 'error';
    this.isOperational = true;

    Object.assign(this, extras);

    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (error, req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || (String(statusCode).startsWith('4') ? 0 : 'error');

  return res.status(statusCode).json({
    status,
    message: error.message || 'Internal Server Error',
    data: null,
    ...(serverConfig.NODE_ENV === 'development' && { stack: error.stack }),
  });
};



module.exports = { AppError, globalErrorHandler};