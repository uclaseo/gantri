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

module.exports = {
  sequelize,
  Art,
};
