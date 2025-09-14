import path from "path";

const filePath = path.resolve("./views/add.html");

export default async function showAddPage(req, res) {
    res.sendFile(filePath)
}