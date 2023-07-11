const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const { Likes } = require("../models");

router.route("/posts/:_postId/likes").post(authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const count = await Likes.count({ where: { PostId: postId } });
    const already = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });

    //좋아요가 기존에 없으면 좋아요 추가, 있으면 좋아요 제거
    if (!already) {
      await Likes.create({ UserId: userId, PostId: postId });
      res.status(200).json({ count });
    } else if (already) {
      await count.destroy();
      res.status(200).json({ count });
    }
  } catch {
    res.status(400).json({ errorMessage: "게시글 좋아요에 실패하였습니다." });
  }
});

router.get("/likes").post(authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;

  // 내가 좋아요 한 글 조회
  const likes = await Likes.findAll({
    attributes: [
      "Title",
      "Nickname",
      "CreatedAt",
      likes.length,
      //좋아요 갯수??
    ],
    where: { UserId: userId },
  });
});

module.exports = router;
