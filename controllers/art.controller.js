const { Art, Comments } = require('../databases/connection');

const ArtController = {
  get: async (req, res) => {
    try {
      const allArts = await Art.findAll({
        attributes: ['id', 'title', 'artist', 'year'],
        include: {
          model: Comments,
          attributes: ['id', 'name', 'content', 'userId'],
        },
        limit: 100,
      });
      return res.status(200).send(allArts);
    } catch (error) {
      console.error('get error: ', error);
      return res.send(error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const art = await Art.findOne({
        where: { id },
        attributes: ['id', 'title', 'artist', 'year'],
        include: [
          {
            model: Comments,
            attributes: ['id', 'name', 'content', 'userId']
          }
        ]
      });
      return res.status(200).send(art);
    } catch (error) {
      console.error('getById error: ', error);
      return res.send(error);
    }
  },

  addComment: async (req, res) => {
    try {  
      const { id } = req.params;
      const { userID, name, content } = req.body;


      if (userID) {
        const comment = await Comments.create({
          userId: userID,
          artId: id,
          name,
          content,
        });
        return res.status(200).send(comment);
      }

      const art = await Art.findOne({
        where: { id },
        include: {
          model: Comments,
          attributes: ['name'],
        },
      });
      let nameExists = false;
      art.comments.forEach((comment) => {
        if (comment.name === name) {
          nameExists = true;
        }
      });

      if (nameExists) {
        return res.send('You can only add one comment per name without userId');
      }

      const comment = await Comments.create({
        artId: id,
        name,
        content,
      });
      return res.status(200).send(comment);

    } catch (error) {
      console.error('addComment error: ', error);
      return res.send(error);
    }
  }
};

module.exports = ArtController;
