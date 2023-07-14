const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  getPosts = async () => {
    const allPost = await this.postRepository.getPosts();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost.map((post) => {
      return { data: allPost };
    });
  };

  getPost = async (userId) => {
    const Post = await this.postRepository.getPost(userId);

    Post.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return Post.map((post) => {
      return { data: allPost };
    });
  };

  getOnepost = async (postId) => {
    const post = await this.postsRepository.findOnePost(postId);
    return { data: create };
  };

  createPost = async (nickname, userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const create = await this.postRepository.createPost(
      nickname,
      userId,
      title,
      content
    );
    return { data: create };
  };

  modifyPost = async ({ postId, nickname, title, content, user }) => {
    const modify = await this.postsRepository.findByIdPost({ postId });
    await this.postsRepository.modifyPost({ nickname, title, content, user });
    return { data: post };
  };

  deletePost = async ({ postId, userId }) => {
    await this.postsRepository.findByIdPost({ postId });
    await this.postsRepository.deletePost({ postId, userId });
  };
}

module.exports = PostService;
