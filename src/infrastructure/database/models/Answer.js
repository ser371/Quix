// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Answer extends Model {
//     static associate(models) {
//       Answer.belongsTo(models.Attempt, { foreignKey: 'attempt_id' });
//       Answer.belongsTo(models.Question, { foreignKey: 'question_id' });
//     }
//   }

//   Answer.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     attempt_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Attempts',
//         key: 'id'
//       }
//     },
//     question_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Questions',
//         key: 'id'
//       }
//     },
//     selected_option_index: {
//       type: DataTypes.TINYINT,
//       allowNull: true
//     },
//     is_correct: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     modelName: 'Answer',
//     tableName: 'Answers',
//     timestamps: false
//   });

//   return Answer;
// };


// Answer.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.Question, { foreignKey: 'question_id' });
      Answer.belongsTo(models.Attempt, { foreignKey: 'attempt_id' });
    }
  }

  Answer.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attempt_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Attempts', key: 'id' } },
    question_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Questions', key: 'id' } },
    selected_option_index: { type: DataTypes.TINYINT, allowNull: false },
    is_correct: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'Answers',
    timestamps: false
  });

  return Answer;
};
