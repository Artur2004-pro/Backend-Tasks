import express from "express";
import postRouter from "./routers/post.js";
import addRouter from "./routers/add.js";
import fileHandler from "./utils/fileHandler.js";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "views");

app.get("/", async (req, res) => {
  const data = await fileHandler.read();
if (!data || !data.length) {
    return res.redirect("/add");
  }
  res.render("home", { data });
});
app.use("/posts", postRouter);
app.use("/add", addRouter);

app.listen(4040, () => console.log("Server started on http://localhost:4040"));
