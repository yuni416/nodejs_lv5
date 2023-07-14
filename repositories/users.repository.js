const { Users } = require("../models");

class UserRepository {
  me = async (nickname) => {
    const me = await Users.findOne({
      where: { nickname },
      attributes: ["nickname", "password"],
    });
    return me;
  };

  login = async (nickname) => {
    const login = await Users.findOne({
      where: { nickname },
      attributes: ["nickname", "password"],
    });
    return login;
  };

  signup = async (nickname) => {
    const { nickname } = req.body;
    const signup = await this.UserService.signup({ nickname: nickname });

    const token = jwt.sign({
      userId: Users.userId,
    });
    res.cookie("Authorization", `Bearer ${token}`);
    return signup;
  };
}

module.exports = UserRepository;
