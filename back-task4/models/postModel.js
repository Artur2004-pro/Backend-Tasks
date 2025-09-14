import fileHandler from "../utils/fileHandler.js";


class PostModel {
  async all() {
    try {
        const posts = await fileHandler.read();
        return posts;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async postById(id) {
    try {
        const data = await this.all();
        const found = data.find(post => post.id == id);
        if (!found) return null;
        return found;
    } catch (err) {
        console.error(err);
        return null;
    }
  }
  async update(post) {
    try {
      const oldData = await this.all();
      const data = oldData.map(p => p.id == post.id? post: p);
      await fileHandler.write(data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new PostModel();