import express from "express";
import { showUsers } from "./models/users.js";
import showAddPage from "./models/add.js";
import save from "./models/addToDb.js";
import removeUser from "./models/remove.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.get("/", showAddPage);
app.get("/users", showUsers);
app.get("/user/delete/:id", removeUser);
app.post("/add", save);

app.listen(4002, () => console.log("Server running on http://localhost:4002"));
