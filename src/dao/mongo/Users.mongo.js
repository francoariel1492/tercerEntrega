const User = require("./models/user.model");

class UsersMongoDao {
  constructor() {}

  async find(email) {
    try {
      console.log("mongo")
      return await User.findOne({email});
    } catch (error) {
      return error;
    }
  }

  async insert(newUserInfo) {
    try {
      console.log("mongo")
      return await User.create(newUserInfo);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll(){
    return await User.deleteMany()
  }
}

module.exports = UsersMongoDao;
