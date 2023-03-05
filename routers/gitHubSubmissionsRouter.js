const express = require('express');
const router = express.Router();

class GitHubSubmissionsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get('/', this.controller.getAll.bind(this.controller));
    router.post('/', this.controller.insertOne.bind(this.controller));
    router.put('/', this.controller.updateOne.bind(this.controller));
    router.get('/cadet-chapter', this.controller.getOne.bind(this.controller));

    return router;
  }
}

module.exports = GitHubSubmissionsRouter;
