// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Exam extends Model {
//     static associate(models) {
//       Exam.hasMany(models.Question, { foreignKey: 'exam_id' });
//       Exam.hasMany(models.Attempt, { foreignKey: 'exam_id' });
//     }
//   }

//   Exam.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     name: {
//       type: DataTypes.STRING(100),
//       unique: true,
//       allowNull: false
//     },
//     duration_min: {
//       type: DataTypes.SMALLINT,
//       allowNull: false
//     },
//     positive_marks: {
//       type: DataTypes.DECIMAL(4, 2),
//       allowNull: false,
//       defaultValue: 1
//     },
//     negative_marks: {
//       type: DataTypes.DECIMAL(4, 2),
//       allowNull: false,
//       defaultValue: 0.25
//     },
//     unanswered_marks: {
//       type: DataTypes.DECIMAL(4, 2),
//       allowNull: false,
//       defaultValue: 0
//     }
//   }, {
//     sequelize,
//     modelName: 'Exam',
//     tableName: 'Exams',
//     timestamps: false
//   });

//   return Exam;
// };



// Exam.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate(models) {
      Exam.hasMany(models.Question, { foreignKey: 'exam_id' });
      Exam.hasMany(models.Attempt, { foreignKey: 'exam_id' });
    }
  }

  Exam.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    duration_min: { type: DataTypes.SMALLINT, allowNull: false },
    positive_marks: { type: DataTypes.DECIMAL(4,2), allowNull: false, defaultValue: 1 },
    negative_marks: { type: DataTypes.DECIMAL(4,2), allowNull: false, defaultValue: 0.25 },
    unanswered_marks: { type: DataTypes.DECIMAL(4,2), allowNull: false, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Exam',
    tableName: 'Exams',
    timestamps: false
  });

  return Exam;
};
