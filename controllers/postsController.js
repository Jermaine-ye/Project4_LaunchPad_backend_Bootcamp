const BaseController = require('./baseController');

class PostsController extends BaseController {
  constructor(model) {
    super(model);
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  async getAll(req, res) {
    const { chapterId } = req.query;
    try {
      const output = await this.model.findAll({
        where: { chapterId: chapterId },
        order: [['id', 'ASC']],
        attributes: {
          include: [
            [
              this.model.sequelize.fn(
                'to_char',
                this.model.sequelize.col('createdAt'),
                'DD-MM-YYYY HH24:MI:SS'
              ),
              'createdAt',
            ],
            [
              this.model.sequelize.fn(
                'to_char',
                this.model.sequelize.col('updatedAt'),
                'DD-MM-YYYY HH24:MI:SS'
              ),
              'updatedAt',
            ],
          ],
        },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const user = await this.model.findOne({
        where: [{ id: id }],
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOne(req, res) {
    const { author, sl, authorName, authorImage, chapterId, content } =
      req.body;
    try {
      const newPost = await this.model.create({
        author: author,
        sl: sl,
        authorName: authorName,
        authorImage: authorImage,
        chapterId: chapterId,
        content: content,
        createdAt: new Date(),
      });
      return res.json(newPost);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateOne(req, res) {
    const id = req.params.id;
    try {
      const updatePost = await this.model.update(req.body, {
        where: { id: id },
      });
      return res.json(updatePost);
    } catch (err) {
      return res.status(500).json({ error: true, msg: err });
    }
  }

  async deleteOne(req, res) {
    const id = req.params.id;
    try {
      const deletePost = await this.model.destroy({
        where: { id: id },
      });
      return res.json(deletePost);
    } catch (err) {
      return res.status(500).json({ error: true, msg: err });
    }
  }
}

module.exports = PostsController;
