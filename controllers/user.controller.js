const { Users } = require('../databases/connection');

const UserController = {
  getUsers: async (req, res) => {
    console.log('getUsers');
  },

  createUser: async (req, res) => {
    console.log('createUser');
  },
};

module.exports = UserController;
