const CommentService = require("../services/comments.service");

class CommentsController {
  CommentService = new CommentService();

  getComment = async (req, res, next) => {
    const comments = await this.CommentService.getComment({
      where: { postId: postId },
      attributes: ["nickname", "content"],
    });
    res.status(200).json({ data: comments });
  };

  createComment = async (req, res, next) => {
    const { postId } = res.locals.user;
    const { commentId, nickname, content } = req.body;
    const comments = await this.CommentService.createComment({
      postId,
      commentId,
      nickname,
      content,
    });
    res.status(200).json({ data: comments });
  };

  modifyComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const commentId = req.params.commentId;
      const comment = await comment.findById({ where: { postId, commentId } });
      const { password, content } = req.body;

      if (!comment) {
        return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
      }
      if (password === comment.password) {
        await Comments.modifyComment(
          { id: commentId },
          { $set: { content: content, userId: userId } }
        );
        return res.status(200).json({ message: "댓글을 수정하였습니다." });
      } else {
        return res.status(404).json;
      }
    } catch {
      res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const commentId = req.params.commentId;
      const comment = await Comments.findById({ where: { userId, commentId } });
      const password = req.body.password;
      if (!comment) {
        return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
      }
      if (password === comment.password) {
        await Comments.deleteComment({ where: { userId, commentId } });
        return res.status(200).json({ message: "댓글을 삭제하였습니다." });
      } else {
        return res.status(404).json;
      }
    } catch {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
  };
}

module.exports = CommentsController;
