const BaseController = require('./baseController');

class CadetsController extends BaseController {
  constructor(model, cadetSectionsModel, cadetChaptersModel, sectionsModel) {
    super(model);
    this.cadetSectionsModel = cadetSectionsModel;
    this.cadetChaptersModel = cadetChaptersModel;
    this.sectionsModel = sectionsModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: [
          { model: this.cadetSectionsModel },
          { model: this.cadetChaptersModel },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    try {
      const cadet = await this.model.findOne({
        where: {
          email: req.query.cadetEmail,
        },
      });
      return res.json(cadet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CadetsController;
