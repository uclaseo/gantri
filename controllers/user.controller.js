const { Users } = require('../databases/connection');

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await Users.findAll();
      return res.status(200).send(users);
    } catch (error) {
      console.error('getUsers error: ', error);
      return res.send(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, age, location } = req.body;
      const [ user, isCreated ] = await Users.findOrCreate({
        where: {
          name,
          age,
          location,
        }
      });
      return res.status(200).send(user);
    } catch (error) {
      console.error('createUser error: ', error);
      return res.send(error);
    }
  },
};

module.exports = UserController;
