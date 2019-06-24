const { Art } = require('../databases/connection');

const ArtController = {
  get: async (req, res) => {
    console.log('get');
    Art.findAll().then(art => {
      console.log(art);
    })
  },
};

module.exports = ArtController;
