class UsersMemoryDao {
  constructor() {
    this.data = [];
  }

  // Comentado debido al bcrypt en el controllador de users
  // async find(email){
  //     try {
  //         const account = this.data.find(email)
  //         return account
  //     } catch (error) {
  //         return error
  //     }
  // }

  async insert(newUserInfo) {
    try {
      this.data.push(newUserInfo);
      console.log(this.data);
      return newUserInfo;
    } catch (error) {
      return error;
    }
  }

  async deleteAll() {
    return (this.data = []);
  }
}

module.exports = UsersMemoryDao;
