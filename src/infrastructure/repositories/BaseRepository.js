class BaseRepository {
//   constructor(model) {
//     this.model = model;
//   }
    constructor(Model) {
        if (!Model) {
            throw new Error('BaseRepository requires a Sequelize Model in its constructor.');
        }
        this.Model = Model;
    }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const [rowsUpdated, [updatedRecord]] = await this.model.update(data, {
      where: { id },
      returning: true
    });
    
    if (rowsUpdated === 0) {
      throw new Error('Record not found');
    }
    
    return updatedRecord;
  }

  async delete(id) {
    const rowsDeleted = await this.model.destroy({
      where: { id }
    });
    
    if (rowsDeleted === 0) {
      throw new Error('Record not found');
    }
    
    return true;
  }
}

module.exports = BaseRepository;




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