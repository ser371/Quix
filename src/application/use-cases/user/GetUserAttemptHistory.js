// src/application/use-cases/User/GetUserAttemptHistory.js (FR-U.5)

/**
 * Use Case: Retrieves a user's complete history of test attempts.
 */
class GetUserAttemptHistory {
    constructor(attemptRepository, userRepository) {
        this.attemptRepository = attemptRepository; // IAttemptRepository interface
        this.userRepository = userRepository; // IUserRepository interface
    }

    async execute(userId) {
        // Simple check to ensure the user exists
        const user = await this.userRepository.findById(userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        // Fetch all attempts for that user
        const history = await this.attemptRepository.findByUserId(userId);
        
        return history;
    }
}

module.exports = GetUserAttemptHistory;