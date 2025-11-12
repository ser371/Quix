const  Attempt   = require('../database/models/Attempt');
const BaseRepository = require('./BaseRepository');


class AttemptRepository extends BaseRepository {
  constructor() {
    super(Attempt);
  }

  async findByUserId(userId) {
    return await Attempt.findAll({ 
      where: { user_id: userId },
      include: ['exam']
    });
  }
}

module.exports = AttemptRepository;