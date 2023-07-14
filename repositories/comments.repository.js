const { Comments } = require("../models");

class CommentRepository {
  getComment = async (postId) => {
    const getComment = await Comments.findOne({
      where: { postId },
      attributes: [
        "postId",
        "commentId",
        "nickname",
        "content",
        "createdAt",
        "updatedAt",
      ],
    });
    return getComment;
  };

  createComment = async ({ nickname, commentId, userId, title, content }) => {
    const createCommentData = await Posts.create({
      attributes: [nickname, commentId, userId, title, content],
    });

    return createCommentData;
  };

  modifyComment = async ({ commentId, title, content }) => {
    const modifyComment = await Comments.update(
      { title, content },
      { where: { commentId } }
    );
    return modifyComment;
  };

  deleteComment = async ({ commentId, title, content }) => {
    const deleteComment = await Comments.destroy(
      { title, content },
      { where: { commentId } }
    );
    return deleteComment;
  };
}

module.exports = CommentRepository;
