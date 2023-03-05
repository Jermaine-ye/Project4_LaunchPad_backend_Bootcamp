const express = require('express');
const router = express.Router();

class SectionsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get('/', this.controller.getAll.bind(this.controller));
    router.post('/', this.controller.insertOne.bind(this.controller));
    router.get(
      '/count-all',
      this.controller.countSections.bind(this.controller)
    );

    return router;
  }
}

module.exports = SectionsRouter;
