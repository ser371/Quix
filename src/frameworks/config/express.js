// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const { errorHandler } = require('../../infrastructure/middleware/errorHandler');
// const { loggingMiddleware } = require('../../infrastructure/middleware/logging');
// const swaggerOptions = require('../docs/swagger');

// const createExpressApp = () => {
//   const app = express();
  
//   // Security middleware
//   app.use(helmet());
//   app.use(cors());
  
//   // Rate limiting
//   const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: 'Too many requests from this IP, please try again later'
//   });
//   app.use(limiter);
  
//   // Body parsing
//   app.use(express.json({ limit: '10mb' }));
//   app.use(express.urlencoded({ extended: true }));
  
//   // Logging
//   app.use(loggingMiddleware);
  
//   // Swagger documentation
//   const specs = swaggerJsdoc(swaggerOptions);
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  
//   // API routes
//   const userRoutes = require('../../infrastructure/routes/userRoutes');
//   const testRoutes = require('../../infrastructure/routes/testRoutes');
//   const adminRoutes = require('../../infrastructure/routes/adminRoutes');
  
//   app.use('/api/users', userRoutes);
//   app.use('/api/tests', testRoutes);
//   app.use('/api/admin', adminRoutes);
  
//   // Error handling
//   app.use(errorHandler);
  
//   return app;
// };

// module.exports = createExpressApp;


// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const { errorHandler } = require('../../infrastructure/middleware/errorHandler');
// const { loggingMiddleware } = require('../../infrastructure/middleware/logging');
// const swaggerOptions = require('../docs/swagger');

// const createExpressApp = () => {
//   const app = express();
  
//   // Security middleware
//   app.use(helmet());
//   app.use(cors());
  
//   // Rate limiting
//   const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: 'Too many requests from this IP, please try again later'
//   });
//   app.use(limiter);
  
//   // Body parsing
//   app.use(express.json({ limit: '10mb' }));
//   app.use(express.urlencoded({ extended: true }));
  
//   // Logging
//   app.use(loggingMiddleware);
  
//   // Swagger documentation
//   const specs = swaggerJsdoc(swaggerOptions);
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  
//   // API routes
//   const userRoutes = require('../../infrastructure/routes/userRoutes');
//   const testRoutes = require('../../infrastructure/routes/testRoutes');
//   const adminRoutes = require('../../infrastructure/routes/adminRoutes');
  
//   app.use('/api/users', userRoutes);
//   app.use('/api/tests', testRoutes);
//   app.use('/api/admin', adminRoutes);
  
//   // Error handling
//   app.use(errorHandler);
  
//   return app;
// };

// module.exports = createExpressApp; // Make sure this is at the end

require('dotenv').config(); // MUST be at the top



const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {  errorHandler } = require('../../infrastructure/middleware/errorHandler');
console.log("af", errorHandler);
const { loggingMiddleware } = require('../../infrastructure/middleware/logging');
// const loggingModule = require('../../infrastructure/middleware/logging');
const swaggerOptions = require('../docs/swagger');

const createExpressApp = () => {
  const app = express();
  
  // Security middleware
  app.use(helmet());
  app.use(cors());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
  });
  app.use(limiter);
  
  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  
  // Logging
  app.use(loggingMiddleware);
// app.use(loggingModule.loggingMiddleware);
  
  // Swagger documentation
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  
  // API routes
  const userRoutes = require('../../infrastructure/routes/userRoutes.js');
  const testRoutes = require('../../infrastructure/routes/testRoutes.js');
  const adminRoutes = require('../../infrastructure/routes/adminRoutes');
  
  app.use('/api/users', userRoutes);
  app.use('/api/tests', testRoutes);
  app.use('/api/admin', adminRoutes);
  
  // Error handling
  console.log("af", errorHandler);
  app.use(errorHandler);
  
  return app;
};

module.exports = createExpressApp;