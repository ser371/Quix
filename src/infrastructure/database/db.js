// // src/infrastructure/database/db.js
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   logging: false, // set to console.log for debugging
// });

// module.exports = sequelize;

// src/infrastructure/database/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,          // Aiven requires SSL
        rejectUnauthorized: false // Only for development (see note below)
      }
    }
  }
);

module.exports = sequelize;