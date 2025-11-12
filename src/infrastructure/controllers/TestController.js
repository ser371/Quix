// const { StartTest, SubmitAnswer, FinalizeTest } = require('../../application/use-cases/test');
const { StartTest } = require('../../application/use-cases/test/StartTest');
const { SubmitAnswer } = require('../../application/use-cases/test/SubmitAnswer');
const { FinalizeTest } = require('../../application/use-cases/test/FinalizeTest');
const ExamRepository  = require('../repositories/ExamRepository.js');
const  QuestionRepository  = require('../repositories/QuestionRepository');
const  AttemptRepository = require('../repositories/AttemptRepository');
const AnswerRepository  = require('../repositories/AnswerRepository');

class TestController {
  constructor() {
    this.examRepository = new ExamRepository();
    this.questionRepository = new QuestionRepository();
    this.attemptRepository = new AttemptRepository();
    this.answerRepository = new AnswerRepository();
    
    this.getExams = this.getExams.bind(this);
    this.startTest = this.startTest.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.finalizeTest = this.finalizeTest.bind(this);
  }

  async getExams(req, res, next) {
    try {
      const exams = await this.examRepository.findAll();
      res.json({
        success: true,
        exams
      });
    } catch (error) {
      next(error);
    }
  }

  async startTest(req, res, next) {
    try {
      const userId = req.user.id;
      const examId = parseInt(req.params.examId);
      
      const startTest = new StartTest(this.examRepository, this.questionRepository, this.attemptRepository);
      const result = await startTest.execute(userId, examId);
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async submitAnswer(req, res, next) {
    try {
      const { attempt_id, question_id, selected_option_index } = req.body;
      
      const submitAnswer = new SubmitAnswer(this.attemptRepository, this.answerRepository);
      await submitAnswer.execute(attempt_id, question_id, selected_option_index);
      
      res.json({
        success: true,
        message: 'Answer submitted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async finalizeTest(req, res, next) {
    try {
      const attemptId = parseInt(req.params.attemptId);
      const userId = req.user.id;
      
      const finalizeTest = new FinalizeTest(this.attemptRepository, this.answerRepository, this.examRepository);
      const result = await finalizeTest.execute(attemptId, userId);
      
      res.json({
        success: true,
        message: 'Test submitted successfully',
        result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TestController;