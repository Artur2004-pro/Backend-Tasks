import fileHandler from "../utils/fileHandler.js";

class AddModel{
    async add(post) {
        post.id = Date.now();
        post.comments = [];
        const data = await fileHandler.read();
        data.push(post);
        await fileHandler.write(data);
    }
}

export default new AddModel();