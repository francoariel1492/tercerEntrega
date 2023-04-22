const Route = require("../router/router");
const {users} = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserRouter extends Route {
  init() {
    //👍
    this.post("/register", ["PUBLIC"], async (req, res) => {
      try {
        console.log("controler")
        const newUserInfo = req.body;
        const data = await users.insert(newUserInfo);
        res.sendSuccess("User create");
      } catch (error) {
        if (error.code === 11000)
          return res.sendUserError("User already exist");
        res.sendUserError(`Something went wrong, ${error}`);
      }
    });
    //👍
    this.post("/login", ["PUBLIC"], async (req, res) => {
      try {
        console.log("controller")
        const { email, password } = req.body;
        const data = await users.find(email);
        const match = await bcrypt.compare(password, data.password);
        if (!match) return res.sendUserError("Incorrect password");

        let token = jwt.sign({ email, role: data.role }, "secreto");

        res.sendSuccess({ token });
      } catch (error) {
        res.sendServerError(`Something went wrong, ${error}`);
      }
    });
    //👍
    this.delete("/delete", ["PUBLIC"], async (req, res) => {
      await users.deleteAll();
      res.sendSuccess("Users deleted");
    });
  }
}

module.exports = UserRouter;
