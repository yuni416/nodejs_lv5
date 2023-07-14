const PostService = require("../services/posts.service");

class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    const posts = await this.postService.getPosts();

    res.status(200).json({ data: posts });
  };

  getPost = async (req, res, next) => {
    const posts = await this.postService.getPost({
      where: { userId: userId },
      attributes: ["nickname", "title", "content", "userId"],
    });
    res.status(200).json({ data: posts });
  };

  getOnepost = async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const results = await this.PostService.getOnepost({
        where: { postId: postId },
        attributes: ["postId", "nickname", "title", "content"],
      });
      const likes = await Likes.findAll({
        attributes: [likes.length],
      });
      res.status(200).json({ data: (results, likes) });
    } catch {
      res
        .status(400)
        .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { nickname, title, content } = req.body;
      await this.PostService.createPost({ nickname, title, content, userId });
      res.status(200).json({ message: "게시글을 생성하였습니다." });
    } catch {
      res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    }
  };

  modifyPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const postId = req.params.postId;
      const { password, nickname, title, content } = req.body;
      const post = await this.PostService.findById({
        where: { postId, userId },
      });
      if (!post) {
        return res
          .status(404)
          .json({ message: "게시글 조회에 실패하였습니다." });
      }
      if (password === post.password) {
        await this.PostService.modifyPost(
          { title, content },
          {
            where: { postId: postId },
          }
        );
        return res.status(200).json({ message: "게시글을 수정하였습니다." });
      } else {
        return res.status(404).json;
      }
    } catch {
      // catch 뒤에 (e)하고 send에 ({message: e.message})하면 에러메시지 확인 가능
      res.status(400).status({ message: "데이터 형식이 올바르지 않습니다." });
    }
  };

  deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { password } = req.body;
      // [ ]?
      const [post] = await this.PostService.find({ where: { postId } });
      if (!post) {
        return res
          .status(404)
          .json({ message: "게시글 조회에 실패하였습니다." });
      }
      if (password === post.password) {
        await this.PostService.deletePost({ where: { postId } });
        return res.status(200).json({ message: "게시글을 삭제하였습니다." });
      } else {
        return res.status(404).json;
      }
    } catch {
      res.status(400).send({ message: "데이터 형식이 올바르지 않습니다." });
    }
  };
}

module.exports = PostsController;
