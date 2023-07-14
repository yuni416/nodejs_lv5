const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const authMiddleware = require("../middlewares/auth-middleware");
require("dotenv").config();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.get("/users/me", usersController.me);
router.post("/posts/signup", authMiddleware, usersController.signup);
router.post("/posts/login", authMiddleware, usersController.login);

module.exports = router;
