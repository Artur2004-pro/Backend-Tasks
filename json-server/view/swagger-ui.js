import fs from "fs";
import path from "path";
import yaml from "js-yaml"; 

export function generateSwaggerYaml(dbFilePath, serverUrl = "http://localhost:7575") {
  const rawData = fs.readFileSync(dbFilePath, "utf8");
  const data = JSON.parse(rawData);
  const paths = {};

  Object.keys(data).forEach((resource) => {
    const basePath = `/${resource}`;

    // GET all
    paths[basePath] = {
      get: { summary: `Get all ${resource}`, responses: { "200": { description: `List of ${resource}` } } },
      post: {
        summary: `Create a new ${resource.slice(0, -1)}`,
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { "201": { description: "Created" } },
      },
    };

    // GET/PUT/DELETE by ID
    paths[`${basePath}/{id}`] = {
      get: {
        summary: `Get ${resource.slice(0, -1)} by ID`,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "number" } }],
        responses: { "200": { description: "Found" }, "404": { description: "Not found" } },
      },
      put: {
        summary: `Update ${resource.slice(0, -1)} by ID`,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "number" } }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { "200": { description: "Updated" }, "404": { description: "Not found" } },
      },
      delete: {
        summary: `Delete ${resource.slice(0, -1)} by ID`,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "number" } }],
        responses: { "200": { description: "Deleted" }, "404": { description: "Not found" } },
      },
    };
  });

  const swagger = {
    openapi: "3.0.0",
    info: { title: "JSON Server API", version: "1.0.0" },
    servers: [{ url: serverUrl }],
    paths,
  };

  const yamlStr = yaml.dump(swagger);
  fs.writeFileSync(path.join(process.cwd(), "swagger.yaml"), yamlStr, "utf8");
  console.log("swagger.yaml generated!");
}
