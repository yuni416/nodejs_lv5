const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { Posts, Comments } = require("../models");

const CommentsController = require("../controllers/comments.controller");
const CommentsController = new CommentsController();

router.get("/comments/:postId", CommentsController.getComment);
router.post(
  "/comments/:postId",
  authMiddleware,
  CommentsController.createComment
);
router.put(
  "/comments/:postId",
  authMiddleware,
  CommentsController.modifyComment
);
router.delete(
  "/comments/:postId",
  authMiddleware,
  CommentsController.deleteComment
);

module.exports = router;
