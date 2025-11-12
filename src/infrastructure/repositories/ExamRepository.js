const  Exam  = require('../database/models');
const BaseRepository = require('./BaseRepository');

class ExamRepository extends BaseRepository {
  constructor() {
    super(Exam);
  }
}

module.exports = ExamRepository;


// class BaseRepository {
//     constructor(Model) {
//         if (!Model) {
//             throw new Error('BaseRepository requires a Sequelize Model in its constructor.');
//         }
//         this.Model = Model;
//     }

//     async findById(id) {
//         // In a real implementation, this would be: return this.Model.findByPk(id);
//         return { id, name: "Mock Base Entity" }; 
//     }

//     async create(data) {
//         // In a real implementation: return this.Model.create(data);
//         return { id: Math.floor(Math.random() * 1000), ...data };
//     }
    
//     // ... add generic methods like update, delete, findAll
// }

// // CRITICAL: Export the class directly, not wrapped in an object.
// module.exports = BaseRepository;