// const express = require('express');
// const router = express.Router();
// const  TestController  = require('../controllers/TestController');
// console.log('Imported TestController =>', TestController);
// const {  authenticateToken } = require('../middleware/auth');

// const testController = new TestController();

// router.get('/exams', authenticateToken, testController.getExams);
// router.post('/start/:examId', authenticateToken, testController.startTest);
// router.put('/answer', authenticateToken, testController.submitAnswer);
// router.post('/submit/:attemptId', authenticateToken, testController.finalizeTest);

// module.exports = router;


const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');
console.log('Imported TestController =>', TestController);
const { authenticateToken } = require('../middleware/auth');

const testController = new TestController();

/**
 * @swagger
 * /test/exams:
 *   get:
 *     summary: Get all available exams
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 *       401:
 *         description: Unauthorized
 */
router.get('/exams', authenticateToken, testController.getExams);

/**
 * @swagger
 * /test/start/{examId}:
 *   post:
 *     summary: Start a test for a specific exam
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the exam to start
 *     responses:
 *       201:
 *         description: Test started successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attempt'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exam not found
 */
router.post('/start/:examId', authenticateToken, testController.startTest);

/**
 * @swagger
 * /test/answer:
 *   put:
 *     summary: Submit an answer for a question in an ongoing test
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attemptId
 *               - questionId
 *               - selectedOptionIndex
 *             properties:
 *               attemptId:
 *                 type: integer
 *                 description: ID of the attempt
 *               questionId:
 *                 type: integer
 *                 description: ID of the question being answered
 *               selectedOptionIndex:
 *                 type: integer
 *                 description: Index of the selected option (0-based)
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid request
 */
router.put('/answer', authenticateToken, testController.submitAnswer);

/**
 * @swagger
 * /test/submit/{attemptId}:
 *   post:
 *     summary: Finalize and submit a test
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the attempt to submit
 *     responses:
 *       200:
 *         description: Test submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attempt'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Attempt not found
 */
router.post('/submit/:attemptId', authenticateToken, testController.finalizeTest);

module.exports = router;