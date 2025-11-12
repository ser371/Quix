const  Answer  = require('../database/models');
const BaseRepository = require('./BaseRepository');

class AnswerRepository extends BaseRepository {
  constructor() {
    super(Answer);
  }

  async findByAttemptId(attemptId) {
    return await Answer.findAll({ where: { attempt_id: attemptId } });
  }
}

module.exports = AnswerRepository;