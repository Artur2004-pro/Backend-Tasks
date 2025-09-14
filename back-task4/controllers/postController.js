import postModel from "../models/postModel.js";

class PostController {
  async all(req, res) {
    const data = await postModel.all();
    if (!data) {
      return res.redirect("/add");
    }
    res.send(data);
  }
  async postById(req, res) {
    const { id } = req.params;
    const data = await postModel.postById(id);
    if (!data) {
      res.redirect("/posts");
      res.status(404).send({ message: `${id} post not found` });
      return;
    }
    res.status(200).render("post", { post: data });
  }

  async addComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    const post = await postModel.postById(id);
    post.comments.push(comment);
    await postModel.update(post);
    res.redirect(`/posts/${id}`)
  }
}

export default new PostController();
