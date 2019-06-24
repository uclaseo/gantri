const express = require('express');
const bodyParser = require('body-parser');


const artRouter = require('./routes/art.routes');
const userRouter = require('./routes/user.routes');

const routers = [
  artRouter,
  userRouter,
];


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routers);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
