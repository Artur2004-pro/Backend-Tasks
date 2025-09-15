import ResourceController from "../controller/resource-controller.js";
import express from "express";

function createRouter(resource) {
  const router = express.Router();
  const controller = new ResourceController(resource);
  
  router.get("/", controller.getall.bind(controller));
  router.get("/:id", controller.getById.bind(controller));
  router.post("/", controller.create.bind(controller));
  router.put("/:id", controller.update.bind(controller));
  router.delete("/:id", controller.remove.bind(controller));

  return router;
}

export default createRouter;
