const UserDTO = require("../dto/User.dto");

class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async find(email) {
    try {
      console.log("users repository")
      return await this.dao.find(email);
    } catch (error) {
      throw error;
    }
  }

  async insert(userInfo) {
    try {
      console.log("repository")
      const newUserInfo = new UserDTO(userInfo);
      return await this.dao.insert(newUserInfo);
    } catch (error) {
      throw error;
    }
  }
  
  async deleteAll() {
    return await this.dao.deleteAll();
  }
}

module.exports = UsersRepository;
