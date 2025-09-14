import { read, write } from "./fileHandle.js";
import path from "path";

const filePath = path.resolve("./db/users.json");

export default async function removeUser(req, res) {
  const { id } = req.params;
  try {
    const data = await read(filePath);
    const result = data.filter((user) => user.id != id);
    await write(filePath, result);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    return false;
  }
}
