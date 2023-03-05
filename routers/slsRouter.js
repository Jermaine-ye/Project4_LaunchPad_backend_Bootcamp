const express = require('express');
const router = express.Router();

class SlsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get('/', this.controller.getAll.bind(this.controller));
    router.post('/', this.controller.insertOne.bind(this.controller));
    router.get('/sl', this.controller.getOne.bind(this.controller));

    return router;
  }
}

module.exports = SlsRouter;
