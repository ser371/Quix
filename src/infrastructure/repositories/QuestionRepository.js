const  Question  = require('../database/models');
const BaseRepository = require('./BaseRepository');

class QuestionRepository extends BaseRepository {
  constructor() {
    super(Question);
  }

  async findByExamId(examId) {
    return await Question.findAll({ where: { exam_id: examId } });
  }

  async bulkCreate(questionsData) {
    return await Question.bulkCreate(questionsData);
  }
}

module.exports = QuestionRepository;