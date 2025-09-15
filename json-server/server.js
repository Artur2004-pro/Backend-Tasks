import express from "express";
import path from "path";
import createRouter from "./router/resource-router.js";
import urlEncoded from "./middlewares/url-encoded.js";
import fs from "fs";
import { generateSwaggerYaml } from "./view/swagger-ui.js";
import { read } from "./model/data-model.js";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import cors from "cors";

const filePath = path.resolve(process.argv[2]);
const port = process.argv[3] ? Number(process.argv[3]) : 8080;
const app = express();

app.use(express.json());
app.use(urlEncoded);
app.use(cors());

generateSwaggerYaml(filePath);
(async () => {
  try {
    const data = await read();
    const keys = Object.keys(data);
    for (let key of keys) {
      app.use(`/${key}`, createRouter(key));
    }
  } catch (err) {
    console.error("Failed to initialize routes:", err);
  }
})();

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(process.cwd(), "swagger.yaml"), "utf8")
);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>
  console.log(`Server starterd on http://localhost:${port}`)
);

export { filePath };
