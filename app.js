const createExpressApp = require('./src/frameworks/config/express');
const { sequelize } = require('./src/infrastructure/database/models');


// const modelsModule = require('./src/infrastructure/database/models');
// console.log('modelsModule =>', modelsModule);
// const { sequelize } = modelsModule || {};
// console.log('sequelize =>', sequelize);

// if (!sequelize) {
//   console.error('Sequelize is undefined. Check ./src/infrastructure/database/models export shape or circular dependencies.');
//   process.exit(1);
// }

const app = createExpressApp();

// Database connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database models
    await sequelize.sync({ force: false });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

connectToDatabase();

module.exports = app;