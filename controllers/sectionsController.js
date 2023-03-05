const BaseController = require('./baseController');

class SectionsController extends BaseController {
  constructor(model, chapterModel, sectionModel) {
    super(model);
    this.chapterModel = chapterModel;
    this.sectionModel = sectionModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  async countSections(req, res) {
    try {
      const { count, rows } = await this.model.findAndCountAll({});
      console.log(count);
      return res.json(rows);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SectionsController;
