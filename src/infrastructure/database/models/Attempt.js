// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Attempt extends Model {
//     static associate(models) {
//       Attempt.belongsTo(models.User, { foreignKey: 'user_id' });
//       Attempt.belongsTo(models.Exam, { foreignKey: 'exam_id' });
//       Attempt.hasMany(models.Answer, { foreignKey: 'attempt_id' });
//     }
//   }

//   Attempt.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Users',
//         key: 'id'
//       }
//     },
//     exam_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Exams',
//         key: 'id'
//       }
//     },
//     start_time: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW
//     },
//     end_time: {
//       type: DataTypes.DATE,
//       allowNull: true
//     },
//     score: {
//       type: DataTypes.DECIMAL(5, 2),
//       allowNull: true
//     },
//     status: {
//       type: DataTypes.ENUM('InProgress', 'Completed', 'Expired'),
//       defaultValue: 'InProgress'
//     }
//   }, {
//     sequelize,
//     modelName: 'Attempt',
//     tableName: 'Attempts',
//     timestamps: false
//   });

//   return Attempt;
// };


// Attempt.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attempt extends Model {
    static associate(models) {
      Attempt.belongsTo(models.User, { foreignKey: 'user_id' });
      Attempt.belongsTo(models.Exam, { foreignKey: 'exam_id' });
      Attempt.hasMany(models.Answer, { foreignKey: 'attempt_id' });
    }
  }

  Attempt.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
    exam_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Exams', key: 'id' } },
    start_time: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    end_time: { type: DataTypes.DATE, allowNull: true },
    score: { type: DataTypes.DECIMAL(5,2), allowNull: true },
    status: { type: DataTypes.ENUM('InProgress','Completed','Expired'), defaultValue: 'InProgress' }
  }, {
    sequelize,
    modelName: 'Attempt',
    tableName: 'Attempts',
    timestamps: false
  });

  return Attempt;
};
