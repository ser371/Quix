// const express = require('express');
// const router = express.Router();
// // const UserController = require('../controllers/UserController');
// const { authenticateToken } = require('../middleware/auth');

// const UserRepository = require('../repositories/UserRepository.js');

// const RegisterUser = require('../../application/use-cases/user/RegisterUser.js');
// const AuthenticateUser = require('../../application/use-cases/user/AuthenticateUser.js');
// const RefreshToken = require('../../application/use-cases/user/RefreshToken.js');
// const UpdateUserProfile = require('../../application/use-cases/user/UpdateUserProfile.js');
// const GetUserAttemptHistory = require('../../application/use-cases/user/GetUserAttemptHistory.js');

// const useCases = {
//     registerUser: new RegisterUser(userRepository, passwordHasher),
//     authenticateUser: new AuthenticateUser(userRepository, passwordHasher, jwtService),
//     refreshTokenUseCase: new RefreshToken(userRepository, jwtService),
//     updateUserProfile: new UpdateUserProfile(userRepository),
//     getUserAttemptHistory: new GetUserAttemptHistory(attemptRepository, userRepository),
// };

// const userController = new UserController(useCases);

// // const userController = new UserController();

// router.post('/register', userController.register);
// router.post('/login', userController.login);
// router.post('/refresh-token', userController.refreshToken);
// router.put('/profile', authenticateToken, userController.updateProfile);
// router.get('/history', authenticateToken, userController.getAttemptHistory);

// module.exports = router;


// src/infrastructure/routes/userRoutes.js

// const express = require('express');

// // 1. --- Imports ---
// const UserController = require('../controllers/UserController'); // UNCOMMENTED
// const UserRepository = require('../repositories/UserRepository');
// const AttemptRepository = require('../repositories/AttemptRepository'); // Added
// const PasswordHasher = require('../security/PasswordHasher'); // Added
// const JwtService = require('../security/JwtService'); // Added

// // Application Use Cases
// const RegisterUser = require('../../application/use-cases/user/RegisterUser.js');
// const AuthenticateUser = require('../../application/use-cases/user/AuthenticateUser.js');
// const RefreshToken = require('../../application/use-cases/user/RefreshToken.js');
// const UpdateUserProfile = require('../../application/use-cases/user/UpdateUserProfile.js'); 
// const GetUserAttemptHistory = require('../../application/use-cases/user/GetUserAttemptHistory.js');

// /**
//  * Factory function to create and configure the User Router with all dependencies wired.
//  * @returns {express.Router} Configured router instance.
//  */
// function createUserRouter() {
//     // 2. --- Instantiate Infrastructure Dependencies (Concrete Implementations) ---
//     // These must be defined and instantiated BEFORE they are passed to the Use Cases.
//     const userRepository = new UserRepository(/* pass UserModel here later */);
//     const attemptRepository = new AttemptRepository(/* pass AttemptModel here later */);
//     const passwordHasher = new PasswordHasher();
//     const jwtService = new JwtService();

//     // 3. --- Instantiate Use Cases (Application Dependencies) ---
//     // Injecting the concrete infrastructure dependencies into the application layer.
//     const useCases = {
//         // Now, userRepository, passwordHasher, and jwtService are defined and accessible.
//         registerUser: new RegisterUser(userRepository, passwordHasher),
//         authenticateUser: new AuthenticateUser(userRepository, passwordHasher, jwtService),
//         refreshTokenUseCase: new RefreshToken(userRepository, jwtService),
//         updateUserProfile: new UpdateUserProfile(userRepository),
//         getUserAttemptHistory: new GetUserAttemptHistory(attemptRepository, userRepository),
//     };

//     // 4. --- Interface Adapters Layer (Controller) ---
//     const userController = new UserController(useCases);

//     // 5. --- Define Routes (using the imported authentication middleware) ---
//     const router = express.Router();
//     // Assuming you have imported authenticateToken somewhere (or will define it later)
//     const { authenticateToken } = require('../middleware/auth'); 

//     // Public routes for authentication
//     router.post('/register', userController.register); // FR-U.1
//     router.post('/login', userController.login);      // FR-U.2
//     router.post('/refresh-token', userController.refreshToken); // FR-U.3

//     // Protected routes (uses middleware)
//     router.put('/profile', authenticateToken, userController.updateProfile); // FR-U.4
//     router.get('/history', authenticateToken, userController.getAttemptHistory); // FR-U.5

//     return router;
// }

// module.exports = createUserRouter;


const express = require('express');
const router = express.Router();

// 1. --- Imports ---
const UserController = require('../controllers/UserController');
const UserRepository = require('../repositories/UserRepository');
const AttemptRepository = require('../repositories/AttemptRepository');
const PasswordHasher = require('../security/PasswordHasher');
const JwtService = require('../security/JwtService');

// Application Use Cases
const RegisterUser = require('../../application/use-cases/user/RegisterUser.js');
const AuthenticateUser = require('../../application/use-cases/user/AuthenticateUser.js');
const RefreshToken = require('../../application/use-cases/user/RefreshToken.js');
const UpdateUserProfile = require('../../application/use-cases/user/UpdateUserProfile.js');
const GetUserAttemptHistory = require('../../application/use-cases/user/GetUserAttemptHistory.js');

/**
 * Factory function to create and configure the User Router with all dependencies wired.
 * @returns {express.Router} Configured router instance.
 */
function createUserRouter() {
    // 2. --- Instantiate Infrastructure Dependencies (Concrete Implementations) ---
    const userRepository = new UserRepository();
    const attemptRepository = new AttemptRepository();
    const passwordHasher = new PasswordHasher();
    const jwtService = new JwtService();

    // 3. --- Instantiate Use Cases (Application Dependencies) ---
    const useCases = {
        registerUser: new RegisterUser(userRepository, passwordHasher),
        authenticateUser: new AuthenticateUser(userRepository, passwordHasher, jwtService),
        refreshTokenUseCase: new RefreshToken(userRepository, jwtService),
        updateUserProfile: new UpdateUserProfile(userRepository),
        getUserAttemptHistory: new GetUserAttemptHistory(attemptRepository, userRepository),
    };

    // 4. --- Interface Adapters Layer (Controller) ---
    const userController = new UserController(useCases);

    // 5. --- Define Routes (using the imported authentication middleware) ---
    const router = express.Router();
    const { authenticateToken } = require('../middleware/auth');

    /**
     * @swagger
     * /users/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *               - name
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 description: User's email
     *               password:
     *                 type: string
     *                 format: password
     *                 description: User's password
     *               name:
     *                 type: string
     *                 description: User's full name
     *               exam_target:
     *                 type: string
     *                 description: Target exam (optional)
     *     responses:
     *       201:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: User registered successfully
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     */
    router.post('/register', userController.register);

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Authenticate user and get token
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *                 format: password
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: Login successful
     *                 data:
     *                   type: object
     *                   properties:
     *                     user:
     *                       $ref: '#/components/schemas/User'
     *                     token:
     *                       type: string
     *                       description: JWT access token
     *                     refreshToken:
     *                       type: string
     *                       description: JWT refresh token
     *       401:
     *         description: Invalid credentials
     */
    router.post('/login', userController.login);

    /**
     * @swagger
     * /users/refresh-token:
     *   post:
     *     summary: Refresh access token
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - refreshToken
     *             properties:
     *               refreshToken:
     *                 type: string
     *                 description: Refresh token
     *     responses:
     *       200:
     *         description: Token refreshed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     token:
     *                       type: string
     *                       description: New JWT access token
     *       401:
     *         description: Invalid refresh token
     */
    router.post('/refresh-token', userController.refreshToken);

    /**
     * @swagger
     * /users/profile:
     *   put:
     *     summary: Update user profile
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               exam_target:
     *                 type: string
     *     responses:
     *       200:
     *         description: Profile updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       401:
     *         description: Unauthorized
     */
    router.put('/profile', authenticateToken, userController.updateProfile);

    /**
     * @swagger
     * /users/history:
     *   get:
     *     summary: Get user's attempt history
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: List of user's attempts
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Attempt'
     *       401:
     *         description: Unauthorized
     */
    router.get('/history', authenticateToken, userController.getAttemptHistory);

    return router;
}

module.exports = createUserRouter;