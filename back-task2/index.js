const fs = require("fs");
const path = require("path");
const extentions = [
  "pdf",
  "jpg",
  "mp3",
  "c",
  "js",
  "cs",
  "py",
  "cpp",
  "txt",
  "gif",
  "bmp",
  "svg",
  "ico",
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wav",
  "flac",
  "ogg",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "zip",
  "rar",
  "html",
  "png",
];


const testFolderPath = path.join(__dirname, "test")
const resultFolderPath = path.join(__dirname, "result");
for (let str of process.argv) {
    if (str == 'create') {
        fs.mkdir(testFolderPath, {recursive: true}, (err) => {
            if (err) throw err;
        });
        for (let i = 1; i <= 150; ++i) {
            const ext = extentions[Math.floor(Math.random() * 30)];
            const filePath = path.join(testFolderPath, `${i}.${ext}`);
            fs.writeFile(filePath, "", "utf-8", (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        return;
    } 
    else if (str == 'organize') {
        fs.mkdir(resultFolderPath, {recursive: true}, (err) => {
            if (err) throw err;
        })
        fs.readdir(testFolderPath, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                const [name ,ext] = file.split(".");
                const oldPath = path.join(testFolderPath, file);

                fs.mkdir(path.join(resultFolderPath, ext), {recursive: true}, (err) => {
                    if (err) throw err;
                    const newPath = path.join(resultFolderPath, ext, file);
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw err;
                    });
                });
            });
        });
        return;
    }
}
