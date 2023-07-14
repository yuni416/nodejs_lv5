const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/posts", postsController.getPosts, postsController.getPost);
router.get("/posts/:postId", postsController.getOnepost);
router.post("/posts/:postId", authMiddleware, postsController.createPost);
router.put("/posts/:postId", authMiddleware, postsController.modifyPost);
router.delete("/posts/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
