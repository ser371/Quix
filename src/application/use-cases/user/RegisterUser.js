// class RegisterUser {
//   constructor(userRepository, passwordHasher) {
//     this.userRepository = userRepository;
//     this.passwordHasher = passwordHasher;
//   }

//   async execute(userData) {
//     const { email, password, name, exam_target } = userData;
    
//     // Check if user already exists
//     const existingUser = await this.userRepository.findByEmail(email);
//     if (existingUser) {
//       throw new Error('User already exists');
//     }
    
//     // Hash password
//     const password_hash = await this.passwordHasher.hash(password);
    
//     // Create user
//     const user = await this.userRepository.create({
//       email,
//       password_hash,
//       role: 'User',
//       name,
//       exam_target
//     });
    
//     return user;
//   }
// }

// module.exports = RegisterUser;


// src/application/use-cases/Auth/RefreshToken.js (FR-U.3)

/**
 * Use Case: Validates and exchanges an old Refresh Token for a new Access Token and Refresh Token.
 */
class RefreshToken {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository; // IUserRepository interface
        this.jwtService = jwtService; // IJwtService interface
    }

    async execute(refreshToken) {
        // 1. Verify the refresh token (Infrastructure Service)
        const payload = this.jwtService.verifyRefreshToken(refreshToken);
        
        if (!payload) {
            const error = new Error('Invalid or expired refresh token.');
            error.statusCode = 401;
            throw error;
        }

        // 2. Look up the user to ensure validity
        const user = await this.userRepository.findById(payload.id);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        // 3. Generate new tokens
        const newPayload = { id: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.generateAccessToken(newPayload);
        const newRefreshToken = this.jwtService.generateRefreshToken(newPayload);

        return { accessToken, newRefreshToken };
    }
}

module.exports = RefreshToken;