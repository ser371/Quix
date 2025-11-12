// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Question extends Model {
//     static associate(models) {
//       Question.belongsTo(models.Exam, { foreignKey: 'exam_id' });
//       Question.belongsTo(models.User, { foreignKey: 'created_by' });
//       Question.hasMany(models.Answer, { foreignKey: 'question_id' });
//     }
//   }

//   Question.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     exam_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Exams',
//         key: 'id'
//       }
//     },
//     topic: {
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
//     difficulty: {
//       type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
//       defaultValue: 'Medium'
//     },
//     question_text: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     options: {
//       type: DataTypes.JSON,
//       allowNull: false,
//       validate: {
//         isValidOptions(value) {
//           if (!Array.isArray(value) || value.length < 2) {
//             throw new Error('Options must be an array with at least 2 items');
//           }
//         }
//       }
//     },
//     correct_option_index: {
//       type: DataTypes.TINYINT,
//       allowNull: false,
//       validate: {
//         min: 0
//       }
//     },
//     explanation: {
//       type: DataTypes.TEXT,
//       allowNull: true
//     },
//     created_by: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Users',
//         key: 'id'
//       }
//     }
//   }, {
//     sequelize,
//     modelName: 'Question',
//     tableName: 'Questions',
//     timestamps: false
//   });

//   return Question;
// };



// Question.js
console.log('Loading Question.js (top)');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  console.log('Initializing Question model factory');

  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Exam, { foreignKey: 'exam_id' });
      Question.belongsTo(models.User, { foreignKey: 'created_by' });
      Question.hasMany(models.Answer, { foreignKey: 'question_id' });
    }
  }

  Question.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    exam_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Exams', key: 'id' } },
    topic: { type: DataTypes.STRING(100), allowNull: false },
    difficulty: { type: DataTypes.ENUM('Easy','Medium','Hard'), defaultValue: 'Medium' },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidOptions(value) {
          if (!Array.isArray(value) || value.length < 2) {
            throw new Error('Options must be an array with at least 2 items');
          }
        }
      }
    },
    correct_option_index: { type: DataTypes.TINYINT, allowNull: false, validate: { min: 0 } },
    explanation: { type: DataTypes.TEXT, allowNull: true },
    created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'Questions',
    timestamps: false
  });

  console.log('Question model initialized and returning class');
  return Question;
};
