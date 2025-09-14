import { read } from "./fileHandle.js";
import path from "path";

const dbFilePath = path.resolve("./db/users.json");

async function showUsers(req, res) {
    try {
        const users = await read(dbFilePath);
        res.render("home", { users }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

export { showUsers };
