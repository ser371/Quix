// const { Sequelize } = require('sequelize');
// const config = require('../../../frameworks/config/database');
// const User = require('./User');
// const Exam = require('./Exam');
// // console.log('Exam require ->', typeof Exam, Exam && Object.keys(Exam));
// const Question = require('./Question');
// const Attempt = require('./Attempt');
// const Answer = require('./Answer');

// const sequelize = new Sequelize(config);

// // // Initialize models
// // const models = {
// //   User: User.init(sequelize, Sequelize.DataTypes),
// //   Exam: Exam.init(sequelize, Sequelize.DataTypes),
// //   Question: Question.init(sequelize, Sequelize.DataTypes),
// //   Attempt: Attempt.init(sequelize, Sequelize.DataTypes),
// //   Answer: Answer.init(sequelize, Sequelize.DataTypes)
// // };

// // // Define associations
// // Object.values(models).forEach(model => {
// //   if (model.associate) {
// //     model.associate(models);
// //   }
// // });

// // Initialize models by calling the factory functions
// const models = {
//   User: User(sequelize, Sequelize.DataTypes),
//   Exam: Exam(sequelize, Sequelize.DataTypes),
//   Question: Question(sequelize, Sequelize.DataTypes),
//   Attempt: Attempt(sequelize, Sequelize.DataTypes),
//   Answer: Answer(sequelize, Sequelize.DataTypes)
// };

// // Define associations
// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

// module.exports = {
//   sequelize,
//   ...models
// };

// // src/infrastructure/database/models/index.js
// const { Sequelize } = require('sequelize');
// const config = require('../../../frameworks/config/database');

// const UserDef = require('./User');
// const ExamDef = require('./Exam');
// const QuestionDef = require('./Question');
// const AttemptDef = require('./Attempt');
// const AnswerDef = require('./Answer');

// // initialize sequelize instance
// const sequelize = new Sequelize(config);

// // initialize models by calling the factory functions
// const models = {
//   User: UserDef(sequelize, Sequelize.DataTypes),
//   Exam: ExamDef(sequelize, Sequelize.DataTypes),
//   Question: QuestionDef(sequelize, Sequelize.DataTypes),
//   Attempt: AttemptDef(sequelize, Sequelize.DataTypes),
//   Answer: AnswerDef(sequelize, Sequelize.DataTypes),
// };

// // run associations if defined
// Object.values(models).forEach((model) => {
//   if (model && typeof model.associate === 'function') {
//     model.associate(models);
//   }
// });

// module.exports = {
//   sequelize,
//   ...models
// };


const { Sequelize } = require('sequelize');
const config = require('../../../frameworks/config/database');

const UserModel = require('./User');
const ExamModel = require('./Exam');
const QuestionModel = require('./Question');
const AttemptModel = require('./Attempt');
const AnswerModel = require('./Answer');

const sequelize = new Sequelize(config);

function resolveModelExport(mod) {
  if (mod && mod.default) mod = mod.default;
  if (typeof mod === 'function') return { type: 'factory', value: mod };
  if (mod && typeof mod.init === 'function') return { type: 'model', value: mod };
  return { type: 'unknown', value: mod };
}


// temporary: put this at the top of src/infrastructure/database/models/index.js
console.log('Exam resolve ->', require.resolve('./Exam'));
function initModel(modExport, name) {
  const resolved = resolveModelExport(modExport);
  if (resolved.type === 'factory') {
    return resolved.value(sequelize, Sequelize.DataTypes);
  }
  if (resolved.type === 'model') {
    return resolved.value;
  }
  console.error(`Model "${name}" has unsupported export shape:`, resolved.value);
  throw new TypeError(`Model "${name}" must export a factory function or an initialized Sequelize Model`);
}

const models = {
  User: initModel(UserModel, 'User'),
  Exam: initModel(ExamModel, 'Exam'),
  Question: initModel(QuestionModel, 'Question'),
  Attempt: initModel(AttemptModel, 'Attempt'),
  Answer: initModel(AnswerModel, 'Answer')
};





Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };
