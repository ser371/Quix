// const { CreateExam, UploadQuestions, EditQuestion, ManageUsers } = require('../../application/use-cases/admin');
const CreateExam = require('../../application/use-cases/admin/CreateExam');
const UploadQuestions = require('../../application/use-cases/admin/UploadQuestions');
const EditQuestion = require('../../application/use-cases/admin/EditQuestion');
const ManageUsers  = require('../../application/use-cases/admin/ManageUsers');


// const  ExamRepository  = require('../repositories/ExamRepository');
const ExamRepository  = require('../repositories/ExamRepository.js');
const  QuestionRepository  = require('../repositories/QuestionRepository');
const  UserRepository  = require('../repositories/UserRepository');

class AdminController {
  constructor() {
    this.examRepository = new ExamRepository();
    this.questionRepository = new QuestionRepository();
    this.userRepository = new UserRepository();
    
    this.createExam = this.createExam.bind(this);
    this.uploadQuestions = this.uploadQuestions.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this);
  }

  async createExam(req, res, next) {
    try {
      const createExam = new CreateExam(this.examRepository);
      const exam = await createExam.execute(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Exam created successfully',
        exam
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadQuestions(req, res, next) {
    try {
      const questionsData = req.body;
      
      const uploadQuestions = new UploadQuestions(this.questionRepository, this.examRepository);
      const result = await uploadQuestions.execute(questionsData);
      
      res.status(201).json({
        success: true,
        message: 'Questions uploaded successfully',
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async updateQuestion(req, res, next) {
    try {
      const questionId = parseInt(req.params.questionId);
      const updateData = req.body;
      
      const editQuestion = new EditQuestion(this.questionRepository);
      const question = await editQuestion.execute(questionId, updateData);
      
      res.json({
        success: true,
        message: 'Question updated successfully',
        question
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { search, page = 1, limit = 10 } = req.query;
      
      const manageUsers = new ManageUsers(this.userRepository);
      const result = await manageUsers.getUsers({ search, page, limit });
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserStatus(req, res, next) {
    try {
      const userId = parseInt(req.params.userId);
      const { active } = req.body;
      
      const manageUsers = new ManageUsers(this.userRepository);
      const user = await manageUsers.updateUserStatus(userId, active);
      
      res.json({
        success: true,
        message: `User ${active ? 'activated' : 'deactivated'} successfully`,
        user
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;