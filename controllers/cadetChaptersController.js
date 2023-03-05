const BaseController = require('./baseController');

class CadetChaptersController extends BaseController {
  constructor(model, cadetModel, chapterModel, cadetSectionModel) {
    super(model);
    this.cadetModel = cadetModel;
    this.chapterModel = chapterModel;
    this.cadetSectionModel = cadetSectionModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  async getAll(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const { cadetId, chapterId } = req.query;
    try {
      const user = await this.model.findOne({
        where: { cadetId: cadetId, chapterId: chapterId },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //added this to see if I can filter with section Id
  async getAllChaptersProgress(req, res) {
    const { cadetId, sectionId } = req.query;
    try {
      const checkData = await this.model.findAll({
        where: { cadetId: cadetId, completed: true },
        include: [
          { model: this.chapterModel, where: { sectionId: sectionId } },
        ],
      });

      return res.json(checkData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // to count for total percentage of bootcamp progress.
  async getTotalChaptersProgress(req, res) {
    const { cadetId } = req.query;
    try {
      const { count, rows } = await this.model.findAndCountAll({
        where: { cadetId: cadetId, completed: true },
      });

      console.log(count);
      return res.json(rows);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // to create row to indicate that the cadet has started the chapter in cadetChapter table.
  async insertOne(req, res) {
    const { cadetId, chapterId, sectionId } = req.body;
    try {
      const checkData = await this.model.findOrCreate({
        where: {
          cadetId: cadetId,
          chapterId: chapterId,
        },
        defaults: {
          completed: false,
        },
      });
      await this.cadetSectionModel.findOrCreate({
        where: {
          cadetId: cadetId,
          sectionId: sectionId,
        },
        defaults: {
          completed: false,
        },
      });

      return res.json(checkData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // to update row when the cadet has completed the chapter in cadetChapter table.
  async updateOne(req, res) {
    const { cadetId, chapterId, sectionId } = req.body;
    try {
      const checkData = await this.model.findOne({
        where: {
          cadetId: cadetId,
          chapterId: chapterId,
        },
      });
      const response = await checkData.update({
        completed: true,
      });
      const totalChapters = await this.chapterModel.findAndCountAll({
        where: {
          sectionId: sectionId,
        },
      });
      const totalCadetChapterProgress = await this.model.findAndCountAll({
        where: { cadetId: cadetId, completed: true },
        include: [
          { model: this.chapterModel, where: { sectionId: sectionId } },
        ],
      });

      if (totalCadetChapterProgress.count === totalChapters.count) {
        await this.cadetSectionModel.update(
          { completed: true },
          {
            where: {
              cadetId: cadetId,
              sectionId: sectionId,
            },
          }
        );
      }
      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CadetChaptersController;
