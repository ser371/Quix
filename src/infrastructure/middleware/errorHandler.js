const logger = require('./logging');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  
  // Log error
  logger.error({
    error: err,
    request: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // If error is not operational, don't leak details
  if (!err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
};

module.exports = {
  AppError,
  errorHandler
};


// const errorHandler = (err, req, res, next) => {
//   console.error('Error:', err);
  
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
//   });
// };

// module.exports = {
//   errorHandler
// };  