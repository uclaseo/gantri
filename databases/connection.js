const Sequelize = require('sequelize');
const fs = require('fs');
const csv = require('csv');



const config = require('../config.json');
const { sequelize: { database, username, password, host } } = config;

const sequelize = new Sequelize(database, username, password, {
  host: host,
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
  accession_number: Sequelize.STRING,
  artistRole: Sequelize.STRING,
  artistId: Sequelize.INTEGER,
  dateText: Sequelize.STRING,
  medium: Sequelize.STRING,
  creditLine: Sequelize.STRING,
  acquisitionYear: Sequelize.INTEGER,
  dimension: Sequelize.STRING,
  width: Sequelize.STRING,
  height: Sequelize.STRING,
  depth: Sequelize.STRING,
  units: Sequelize.STRING,
  inscription: Sequelize.STRING,
  thumbnailCopyright: Sequelize.STRING,
  thumbnailUrl: Sequelize.STRING,
  url: Sequelize.STRING,
});

const Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.STRING,
  },
});

const Comments = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING,
  }
});

Art.hasMany(Comments);
Comments.belongsTo(Art);
Comments.belongsTo(Users);

const importCSV = () => {
  const input = fs.createReadStream('./the-tate-collection.csv');
  const parser = csv.parse({
    delimiter: ';',
    columns: true
  });
  const transform = csv.transform((row) => {
    const resultObject = {
      id: row['id'],
      accession_number: row['accession_number'],
      artist: row['artist'],
      artistRole: row['artistRole'],
      artistId: row['artistId'],
      title: row['title'],
      dateText: row['dateText'],
      medium: row['medium'],
      creditLine: row['creditLine'],
      year: row['year'],
      acquisitionYear: row['acquisitionYear'],
      dimensions: row['dimensions'],
      width: row['width'],
      height: row['height'],
      depth: row['depth'],
      units: row['units'],
      inscription: row['inscription'],
      thumbnailCopyright: row['thumbnailCopyright'],
      thumbnailUrl: row['thumbnailUrl'],
      url: row['url'],
    };
    Art.create(resultObject)
      .then(() => {
        console.log('CSV imported Successfully');
      })
      .catch((error) => {
        console.log('CSV is not imported: ', error)
      })
  });
  input.pipe(parser).pipe(transform);
}

sequelize
  .sync()
  .then(() => {
    importCSV();
  });

module.exports = {
  sequelize,
  Art,
  Users,
  Comments,
};
