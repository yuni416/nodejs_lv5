const UserService = require("../services/users.service");
require("dotenv").config();

class UsersController {
  UserService = new UserService();

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

// 회원가입 API
signup = async (req, res) => {
  const { nickname, password, confirmPassword } = req.body;
  // 닉네임 구성 조건
  const nick = /[a-zA-Z0-9]/;
  if (!nick.test(nickname)) {
    return res.status(400).json({
      errorMessage: "닉네임은 알파벳 대소문자와 숫자로 작성해주세요.",
    });
  }
  // 비밀번호 구성 조건
  const pass = RegExp(`${nickname}`);
  if (pass.test(password)) {
    return res.status(412).json({
      errorMessage: "비밀번호는 닉네임과 같은 부분이 있어서는 안됩니다.",
    });
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
    });
    return;
  }

  //nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
  const existsUsers = await this.UserService.signup({ nickname });
  if (existsUsers) {
    res.status(409).json({
      errorMessage: "중복된 닉네임입니다.",
    });
    return;
  }

  const user = new User({ nickname, password });
  await user.save();

  res.status(201).json({});
};

login = async (req, res) => {
  const { nickname, password } = req.body;
  const user = await this.UserService.login({ nickname: nickname });
  if (!user) {
    return res.status(409).json({
      errMessage: "가입되지 않은 아이디입니다. 아이디를 확인해주세요.",
    });
  } else if (password !== user.password) {
    return res.status(409).json({ errMessage: "비밀번호를 확인해주세요." });
  }

  const token = jwt.sign(
    {
      userId: user.userId,
    },
    process.env.DB_SECRETKEY
  );
  res.cookie("Authorization", `Bearer ${token}`);
  return res.json({ message: "로그인 완료" });
};

module.exports = UsersController;
