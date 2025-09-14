import fs from "fs/promises";

async function read(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function write(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function push(path, user) {
  try {
    const data = await read(path);
    if (data && Array.isArray(data)) {
      data.push(user);
    } else {
      await fs.writeFile(path, JSON.stringify([user], null, 2), "utf-8");
      return true;
    }
    await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export { read, push, write };
