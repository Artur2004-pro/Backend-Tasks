import addModel from "../models/addModel.js";

class AddController{
    async add(req, res) {
        const {text, title} = req.body;
        const post = {text: text, title: title};
        try {
            await addModel.add(post);
            res.status(301)
            res.redirect("/");
            return true;
        } catch (err) {
            console.error(err);
            res.status(500).send({message: "internal server Error"});
            res.redirect("/posts");
            return false;
        }
    }
    viewAdd(req, res) {
        res.render("add");
    }
}

export default new AddController();