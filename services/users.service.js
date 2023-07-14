const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  me = async (req, res) => {
    const [nickname, password] = res.locals.user;

    res.status(200).json({
      user: {
        nickname: nickname,
        password: password,
      },
    });
  };
}

signup = async (req, res) => {
  const { nickname, password } = req.body;

  const user = new User({ nickname, password });
  await user.save();

  res.status(201).json({});
};

login = async (req, res) => {
  const { nickname } = req.body;
  const user = await this.UserService.login({ nickname: nickname });

  const token = jwt.sign({
    userId: user.userId,
  });
  res.cookie("Authorization", `Bearer ${token}`);
  return res.json({ message: "로그인 완료" });
};

module.exports = UserService;
