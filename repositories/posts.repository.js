const { Posts } = require("../models");

class PostRepository {
  getPosts = async () => {
    const getPosts = await Posts.findAll({
      attributes: [
        "postId",
        "UserId",
        "title",
        "createdAt",
        "updatedAt",
        "nickname",
        "content",
      ],
    });
    return getPosts;
  };

  getPost = async (userId) => {
    const getPost = await Posts.findOne({
      where: { userId },
      attributes: [
        "postId",
        "userId",
        "nickname",
        "title",
        "content",
        "createdAt",
        "updatedAt",
      ],
    });
    return getPost;
  };

  getOnepost = async (postId) => {
    const getOnepost = await Posts.findOne({
      where: { postId },
      attributes: [
        "postId",
        "userId",
        "nickname",
        "title",
        "content",
        "createdAt",
        "updatedAt",
      ],
    });
    return getOnepost;
  };

  createPost = async ({ nickname, userId, title, content }) => {
    const createPostData = await Posts.create({
      attributes: [nickname, userId, title, content],
    });

    return createPostData;
  };

  modifyPost = async ({ postId, title, content }) => {
    return await Posts.update({ title, content }, { where: { postId } });
  };

  deletePost = async ({ postId, title, content }) => {
    return await Posts.destroy({ title, content }, { where: { postId } });
  };
}

module.exports = PostRepository;
