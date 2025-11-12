// const express = require('express');
// const router = express.Router();
// const AdminController = require('../controllers/AdminController');
// console.log('Imported AdminController =>', AdminController);
// const { authenticateToken, requireAdmin } = require('../middleware/auth');

// const adminController = new AdminController();

// router.post('/exams', authenticateToken, requireAdmin, adminController.createExam);
// router.post('/questions/upload', authenticateToken, requireAdmin, adminController.uploadQuestions);
// router.put('/questions/:questionId', authenticateToken, requireAdmin, adminController.updateQuestion);
// router.get('/users', authenticateToken, requireAdmin, adminController.getUsers);
// router.put('/users/:userId/status', authenticateToken, requireAdmin, adminController.updateUserStatus);

// module.exports = router;

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
console.log('Imported AdminController =>', AdminController);
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const adminController = new AdminController();

/**
 * @swagger
 * /admin/exams:
 *   post:
 *     summary: Create a new exam (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - duration_min
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the exam
 *               duration_min:
 *                 type: integer
 *                 description: Duration in minutes
 *               positive_marks:
 *                 type: number
 *                 description: Marks for correct answer
 *               negative_marks:
 *                 type: number
 *                 description: Negative marks for wrong answer
 *               unanswered_marks:
 *                 type: number
 *                 description: Marks for unanswered questions
 *     responses:
 *       201:
 *         description: Exam created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/exams', authenticateToken, requireAdmin, adminController.createExam);

/**
 * @swagger
 * /admin/questions/upload:
 *   post:
 *     summary: Upload questions in bulk (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV or Excel file containing questions
 *     responses:
 *       200:
 *         description: Questions uploaded successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/questions/upload', authenticateToken, requireAdmin, adminController.uploadQuestions);

/**
 * @swagger
 * /admin/questions/{questionId}:
 *   put:
 *     summary: Update a question (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               question_text:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correct_option_index:
 *                 type: integer
 *               explanation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Question not found
 */
router.put('/questions/:questionId', authenticateToken, requireAdmin, adminController.updateQuestion);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/users', authenticateToken, requireAdmin, adminController.getUsers);

/**
 * @swagger
 * /admin/users/{userId}/status:
 *   put:
 *     summary: Update user status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *                 description: New status of the user
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put('/users/:userId/status', authenticateToken, requireAdmin, adminController.updateUserStatus);

module.exports = router;