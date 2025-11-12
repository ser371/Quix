// const { RegisterUser, AuthenticateUser, RefreshToken, UpdateUserProfile, GetUserAttemptHistory } = require('../../application/use-cases/user');
// const { UserRepository } = require('../repositories/UserRepository');
// const { AttemptRepository } = require('../repositories/AttemptRepository');
// const { PasswordHasher } = require('../security/PasswordHasher');
// const { JwtService } = require('../security/JwtService');

// class UserController {
//   constructor() {
//     this.userRepository = new UserRepository();
//     this.attemptRepository = new AttemptRepository();
//     this.passwordHasher = new PasswordHasher();
//     this.jwtService = new JwtService();
    
//     this.register = this.register.bind(this);
//     this.login = this.login.bind(this);
//     this.refreshToken = this.refreshToken.bind(this);
//     this.updateProfile = this.updateProfile.bind(this);
//     this.getAttemptHistory = this.getAttemptHistory.bind(this);
//   }

//   async register(req, res, next) {
//     try {
//       const registerUser = new RegisterUser(this.userRepository, this.passwordHasher);
//       const user = await registerUser.execute(req.body);
      
//       // Remove sensitive data
//       const { password_hash, ...userWithoutPassword } = user.toJSON();
      
//       res.status(201).json({
//         success: true,
//         message: 'User registered successfully',
//         user: userWithoutPassword
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async login(req, res, next) {
//     try {
//       const { email, password } = req.body;
      
//       const authenticateUser = new AuthenticateUser(this.userRepository, this.passwordHasher, this.jwtService);
//       const { user, accessToken, refreshToken } = await authenticateUser.execute(email, password);
      
//       // Remove sensitive data
//       const { password_hash, ...userWithoutPassword } = user.toJSON();
      
//       res.json({
//         success: true,
//         message: 'Login successful',
//         user: userWithoutPassword,
//         accessToken,
//         refreshToken
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async refreshToken(req, res, next) {
//     try {
//       const { refreshToken } = req.body;
      
//       const refreshTokenUseCase = new RefreshToken(this.userRepository, this.jwtService);
//       const { accessToken, newRefreshToken } = await refreshTokenUseCase.execute(refreshToken);
      
//       res.json({
//         success: true,
//         accessToken,
//         refreshToken: newRefreshToken
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async updateProfile(req, res, next) {
//     try {
//       const userId = req.user.id;
//       const { name, exam_target } = req.body;
      
//       const updateUserProfile = new UpdateUserProfile(this.userRepository);
//       const user = await updateUserProfile.execute(userId, { name, exam_target });
      
//       // Remove sensitive data
//       const { password_hash, ...userWithoutPassword } = user.toJSON();
      
//       res.json({
//         success: true,
//         message: 'Profile updated successfully',
//         user: userWithoutPassword
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async getAttemptHistory(req, res, next) {
//     try {
//       const userId = req.user.id;
      
//       const getUserAttemptHistory = new GetUserAttemptHistory(this.attemptRepository, this.userRepository);
//       const history = await getUserAttemptHistory.execute(userId);
      
//       res.json({
//         success: true,
//         history
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }







// // module.exports = UserController;

// // src/infrastructure/controllers/UserController.js

// /**
//  * Controller class responsible for handling HTTP requests for User/Auth endpoints.
//  * This file is an adapter (Interface Adapters Layer). It ensures strict adherence to
//  * Clean Architecture by accepting Use Cases as dependencies (Dependency Injection).
//  */
// class UserController {
//   /**
//    * @param {object} useCases - Object containing all necessary user-related Use Cases.
//    * @param {RegisterUser} useCases.registerUser - Use Case for user registration (FR-U.1).
//    * @param {AuthenticateUser} useCases.authenticateUser - Use Case for user login (FR-U.2).
//    * @param {RefreshToken} useCases.refreshTokenUseCase - Use Case for refreshing tokens (FR-U.3).
//    * @param {UpdateUserProfile} useCases.updateUserProfile - Use Case for profile updates (FR-U.4).
//    * @param {GetUserAttemptHistory} useCases.getUserAttemptHistory - Use Case for attempt history (FR-U.5).
//    */
//   constructor(useCases) {
//     // --- CORRECT: Inject Use Cases and Services (Application Layer Dependencies) ---
//     this.registerUser = useCases.registerUser;
//     this.authenticateUser = useCases.authenticateUser;
//     this.refreshTokenUseCase = useCases.refreshTokenUseCase;
//     this.updateUserProfile = useCases.updateUserProfile;
//     this.getUserAttemptHistory = useCases.getUserAttemptHistory;
    
//     // Bind methods to 'this' to maintain context in Express router
//     this.register = this.register.bind(this);
//     this.login = this.login.bind(this);
//     this.refreshToken = this.refreshToken.bind(this);
//     this.updateProfile = this.updateProfile.bind(this);
//     this.getAttemptHistory = this.getAttemptHistory.bind(this);
//   }
  
//   // --- The execution logic uses the injected Use Cases directly ---

//   async register(req, res, next) {
//     try {
//       // 1. Extract data from request body
//       // Ensure all fields required by RegisterUser.execute are passed
//       const { email, password, name, examTarget } = req.body; 

//       // 2. Execute the Use Case (Logic is decoupled from Controller)
//       const user = await this.registerUser.execute({ email, password, name, examTarget });
      
//       // 3. Format response: Remove sensitive data before sending
//       const userJSON = user.toJSON ? user.toJSON() : user;
//       const { password_hash, ...userWithoutPassword } = userJSON;
      
//       res.status(201).json({
//         success: true,
//         message: 'User registered successfully',
//         user: userWithoutPassword
//       });
//     } catch (error) {
//       // Pass error to Express error handling middleware
//       next(error);
//     }
//   }

//   async login(req, res, next) {
//     try {
//       const { email, password } = req.body;
      
//       // Execute the Use Case
//       const { user, accessToken, refreshToken } = await this.authenticateUser.execute(email, password);
      
//       // Format response: Remove sensitive data before sending
//       const userJSON = user.toJSON ? user.toJSON() : user;
//       const { password_hash, ...userWithoutPassword } = userJSON;
      
//       res.json({
//         success: true,
//         message: 'Login successful',
//         user: userWithoutPassword,
//         accessToken,
//         refreshToken
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async refreshToken(req, res, next) {
//     try {
//       // Assumes refresh token is provided in the request body
//       const { refreshToken } = req.body; 
      
//       const { accessToken, newRefreshToken } = await this.refreshTokenUseCase.execute(refreshToken);
      
//       res.json({
//         success: true,
//         accessToken,
//         refreshToken: newRefreshToken
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async updateProfile(req, res, next) {
//     try {
//       // userId must be provided by the JWT middleware (req.user.id)
//       const userId = req.user.id; 
//       // Update data containing fields like name and exam_target (FR-U.4)
//       const updateData = req.body; 
      
//       const user = await this.updateUserProfile.execute(userId, updateData);
      
//       // Format response
//       const userJSON = user.toJSON ? user.toJSON() : user;
//       const { password_hash, ...userWithoutPassword } = userJSON;
      
//       res.json({
//         success: true,
//         message: 'Profile updated successfully',
//         user: userWithoutPassword
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async getAttemptHistory(req, res, next) {
//     try {
//       // userId must be provided by the JWT middleware (req.user.id)
//       const userId = req.user.id; 
      
//       // Fetch history (FR-U.5)
//       const history = await this.getUserAttemptHistory.execute(userId);
      
//       res.json({
//         success: true,
//         history
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// module.exports = UserController;




class UserController {
  /**
   * @param {object} useCases - Object containing all necessary user-related Use Cases.
   * @param {RegisterUser} useCases.registerUser - Use Case for user registration (FR-U.1).
   * @param {AuthenticateUser} useCases.authenticateUser - Use Case for user login (FR-U.2).
   * @param {RefreshToken} useCases.refreshTokenUseCase - Use Case for refreshing tokens (FR-U.3).
   * @param {UpdateUserProfile} useCases.updateUserProfile - Use Case for profile updates (FR-U.4).
   * @param {GetUserAttemptHistory} useCases.getUserAttemptHistory - Use Case for attempt history (FR-U.5).
   */
  constructor(useCases) {
    // --- CORRECT: Inject Use Cases and Services (Application Layer Dependencies) ---
    this.registerUser = useCases.registerUser;
    this.authenticateUser = useCases.authenticateUser;
    this.refreshTokenUseCase = useCases.refreshTokenUseCase;
    this.updateUserProfile = useCases.updateUserProfile;
    this.getUserAttemptHistory = useCases.getUserAttemptHistory;
    
    // Bind methods to 'this' to maintain context in Express router
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getAttemptHistory = this.getAttemptHistory.bind(this);
  }
  
  // --- The execution logic uses the injected Use Cases directly ---

  async register(req, res, next) {
    try {
      // 1. Extract data from request body
      const { email, password, name, exam_target } = req.body; // Changed from examTarget to exam_target

      // 2. Execute the Use Case (Logic is decoupled from Controller)
      const user = await this.registerUser.execute({ 
        email, 
        password, 
        name, 
        examTarget: exam_target // Map to the expected parameter name
      });
      
      // 3. Format response: Remove sensitive data before sending
      const userJSON = user.toJSON ? user.toJSON() : user;
      const { password_hash, ...userWithoutPassword } = userJSON;
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      // Pass error to Express error handling middleware
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Execute the Use Case
      const { user, accessToken, refreshToken } = await this.authenticateUser.execute(email, password);
      
      // Format response: Remove sensitive data before sending
      const userJSON = user.toJSON ? user.toJSON() : user;
      const { password_hash, ...userWithoutPassword } = userJSON;
      
      res.json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
        accessToken,
        refreshToken
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      // Assumes refresh token is provided in the request body
      const { refreshToken } = req.body; 
      
      const { accessToken, newRefreshToken } = await this.refreshTokenUseCase.execute(refreshToken);
      
      res.json({
        success: true,
        accessToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      // userId must be provided by the JWT middleware (req.user.id)
      const userId = req.user.id; 
      // Update data containing fields like name and exam_target (FR-U.4)
      const updateData = req.body; 
      
      const user = await this.updateUserProfile.execute(userId, updateData);
      
      // Format response
      const userJSON = user.toJSON ? user.toJSON() : user;
      const { password_hash, ...userWithoutPassword } = userJSON;
      
      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      next(error);
    }
  }

  async getAttemptHistory(req, res, next) {
    try {
      // userId must be provided by the JWT middleware (req.user.id)
      const userId = req.user.id; 
      
      // Fetch history (FR-U.5)
      const history = await this.getUserAttemptHistory.execute(userId);
      
      res.json({
        success: true,
        history
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;