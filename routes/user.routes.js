const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.route('/users')
  .get(UserController.getUsers)
  .post(UserController.createUser);

module.exports = router;
