import { read, write } from "../model/data-model.js";

class ResourceController {
  constructor(resource) {
    this.resource = resource;
  }
  async getall(req, res) {
    try {
      const allData = await read();
      const data = allData[this.resource];
      res.status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "internal server error" });
    }
  }
  async getById(req, res) {
    try {
      const id = req.body.id || req.params.id;
      const allData = await read();
      const data = allData[this.resource];
      const found = data.find((item) => item.id == id);
      if (!found) {
        res.status(404).send({ message: "not found" });
      }
      res.status(200).send(found);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "internal server error" });
    }
  }
  async create(req, res) {
    const keys = Object.keys(req.body);
    const object = {};
    object.id = Date.now();
    for (let key of keys) {
      object[key] = req.body[key];
    }
    try {
      const allData = await read();
      const data = allData[this.resource];
      data.push(object);
      await write(allData);
      res.status(201).send(object);
    } catch (err) {
      console.error(err);
    }
  }
  async update(req, res) {
    const id = req.body.id || req.params.id;
    try {
      const allData = await read();
      const data = allData[this.resource];
      const index = data.findIndex((item) => item.id == id);
      if (index < 0) {
        res.status(404).send({ message: "not found" });
      }
      const keys = Object.keys(req.body);
      for (let key of keys) {
        data[index][key] = req.body[key];
      }
      await write(allData);
      res.status(201).send(data[index]);
    } catch (err) {
      console.error(err);
    }
  }
  async remove(req, res) {
    const id = req.body.id || req.params.id;
    try {
      const allData = await read();
      const data = allData[this.resource];
      allData[this.resource] = data.filter((item) => item.id != id);
      await write(allData);
      res.status(203);
    } catch (err) {
      console.error(err);
    }
  }
}

export default ResourceController;
