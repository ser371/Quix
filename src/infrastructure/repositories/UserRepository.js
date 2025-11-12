const  User  = require('../database/models/User');
const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async updateProfile(userId, profileData) {
    return await User.update(profileData, {
      where: { id: userId },
      returning: true
    });
  }
}

module.exports = UserRepository;