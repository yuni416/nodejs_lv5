const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
exports.router = router;

const { Likes } = require("../models");

router.route("/posts/:_postId/likes").post(authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
  } catch {}
});
//게시글 좋아요 기능

module.exports = router;
