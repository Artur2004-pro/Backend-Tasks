import { push } from "./fileHandle.js";
import path from "path";

const filePath = path.resolve("./db/users.json");

export default async function save(req, res) {
    const {name, surname} = req.body;
    if (!name || !surname) {
        res.redirect("/")
    }
    const user = {
        name,
        surname,
        id: Date.now()
    }
    await push(filePath, user);
    res.redirect("/users")
}