const Sequelize = require('sequelize');

const sequelize = new Sequelize('gantri', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false,
  }
});

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');


    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

    const Art = sequelize.define('art', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      artist: {
        type: Sequelize.STRING,
    
      },
      year: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.INTEGER,
      }
    });

    const Users = sequelize.define('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      }
    });

    const Comments = sequelize.define('comments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.STRING,
      }
    });

module.exports = {
  sequelize,
  Art,
  Users,
  Comments,
};
