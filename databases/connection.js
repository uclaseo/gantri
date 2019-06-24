const Sequelize = require('sequelize');
const fs = require('fs');
const csv = require('csv');
const input = fs.createReadStream('./the-tate-collection.csv');
const parser = csv.parse({
  delimiter: ';',
  columns: true
});


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
sequelize
  .sync({ force: true })
  .then(() => {
    const transform = csv.transform((row) => {
      const resultObject = {
        id: row['id'],
        // accession_number: row['accession_number'],
        artist: row['artist'],
        // artistRole: row['artistRole'],
        // artistId: row['artistId'],
        title: row['title'],
        // dateText: row['dateText'],
        // medium: row['medium'],
        // creditLine: row['creditLine'],
        year: row['year'],
        // acquisitionYear: row['acquisitionYear'],
        // dimensions: row['dimensions'],
        // width: row['width'],
        // height: row['height'],
        // depth: row['depth'],
        // units: row['units'],
        // inscription: row['inscription'],
        // thumbnailCopyright: row['thumbnailCopyright'],
        // thumbnailUrl: row['thumbnailUrl'],
        // url: row['url'],
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
  });

module.exports = {
  sequelize,
  Art,
  Users,
  Comments,
};
