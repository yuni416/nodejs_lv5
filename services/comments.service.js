const CommentRepository = require("../repositories/comments.repository");

class CommentService {
  commentRepository = new CommentRepository();

  getComment = async (postId) => {
    const Comment = await this.commentRepository.getComment(postId);

    Comment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return Comment.map((Comment) => {
      return { data: Comment };
    });
  };

  createComment = async (nickname, userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const create = await this.commentRepository.createComment(
      nickname,
      userId,
      title,
      content
    );
    return { data: create };
  };

  modifyComment = async ({ postId, nickname, title, content, user }) => {
    const modify = await this.commentRepository.findById({ postId });
    await this.commentRepository.modifyComment({
      nickname,
      title,
      content,
      user,
    });
    return { data: post };
  };

  deleteComment = async ({ postId, userId }) => {
    await this.commentRepository.findById({ postId });
    await this.commentRepository.deleteComment({ postId, userId });
  };
}

module.exports = CommentService;
