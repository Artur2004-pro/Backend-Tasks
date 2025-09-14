import fs from "fs/promises";
import path from "path";

class FileHandler {
  static filepath = path.resolve("./db/posts.json");
  async read() {
    try {
      const data = await fs.readFile(FileHandler.filepath, "utf-8");
      if (!data) return [];

      return JSON.parse(data);
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async write(data) {
    try {
      await fs.writeFile(FileHandler.filepath, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error(err);
    }
  }
}

export default new FileHandler();
