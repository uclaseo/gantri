const express = require('express');
const ArtController = require('../controllers/art.controller');

const router = express.Router();

router.route('/art')
  .get(ArtController.get);


module.exports = router;
