// const winston = require('winston');
// const { combine, timestamp, printf, colorize } = winston.format;

// // Custom log format
// const logFormat = printf(({ level, message, timestamp, ...meta }) => {
//   return `${timestamp} [${level}]: ${message} ${
//     Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
//   }`;
// });

// // Create logger
// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'info',
//   format: combine(
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     logFormat
//   ),
//   transports: [
//     new winston.transports.Console({
//       format: combine(
//         colorize(),
//         timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//         logFormat
//       )
//     }),
//     new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'logs/combined.log' })
//   ]
// });

// // HTTP request logging middleware
// const loggingMiddleware = (req, res, next) => {
//   const start = Date.now();
  
//   res.on('finish', () => {
//     const duration = Date.now() - start;
//     logger.info({
//       method: req.method,
//       url: req.url,
//       statusCode: res.statusCode,
//       duration: `${duration}ms`,
//       ip: req.ip,
//       userAgent: req.get('User-Agent')
//     });
//   });
  
//   next();
// };

// module.exports = {
//   logger,
//   loggingMiddleware
// };


const winston = require('winston');
const { combine, timestamp, printf, colorize, splat } = winston.format;
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Custom log format that handles objects properly
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  // Handle when message is an object
  let formattedMessage = message;
  if (typeof message === 'object' && message !== null) {
    formattedMessage = JSON.stringify(message, null, 2);
  }

  // Handle metadata
  const metaStr = Object.keys(meta).length 
    ? JSON.stringify(meta, null, 2) 
    : '';

  // Add stack trace if available (for errors)
  const stackTrace = stack ? `\n${stack}` : '';

  return `${timestamp} [${level}]: ${formattedMessage} ${metaStr}${stackTrace}`;
});

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    splat(), // Enables string interpolation
    logFormat
  ),
  transports: [
    // Console transport with colors
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        logFormat
      )
    }),
    // Error log file
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'), 
      level: 'error',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        logFormat
      )
    }),
    // Combined log file
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log'),
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        logFormat
      )
    })
  ],
  // Handle uncaught exceptions and rejections
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, 'rejections.log') })
  ]
});

// HTTP request logging middleware
const loggingMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('HTTP Request', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      contentLength: res.get('Content-Length')
    });
  });
  
  next();
};

module.exports = {
  logger,
  loggingMiddleware
};

// // Simple logging middleware without winston for debugging
// const loggingMiddleware = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };

// const logger = {
//   info: (msg) => console.log('INFO:', msg),
//   error: (msg) => console.error('ERROR:', msg)
// };

// module.exports = {
//   logger,
//   loggingMiddleware
// };