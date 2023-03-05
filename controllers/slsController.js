const BaseController = require('./baseController');

class SlsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getOne(req, res) {
    try {
      const sl = await this.model.findOne({
        where: {
          email: req.query.slEmail,
        },
      });
      return res.json(sl);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SlsController;
