const express = require('express');
const ArtController = require('../controllers/art.controller');

const router = express.Router();

router.route('/art')
  .get(ArtController.get);

router.route('/art/:id')
  .get(ArtController.getById);

router.route('/art/:id/comments')
  .post(ArtController.addComment)

module.exports = router;
