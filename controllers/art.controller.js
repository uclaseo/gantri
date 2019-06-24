const { Art } = require('../databases/connection');

const ArtController = {
  get: async (req, res) => {
    console.log('get');
    // Art.findAll().then(art => {
    //   console.log(art);
    // })
  },

  getById: async (req, res) => {
    console.log('getbyid');
  },

  addComment: async (req, res) => {
    console.log('addComment');
  }
};

module.exports = ArtController;
