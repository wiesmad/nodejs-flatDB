const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  checkBody,
  checkUser
} = require('../handlers/userHandler');

router.route('/')
  .get(getAllUsers)

router.route('/:id')
  .get(checkUser, getUser)

router.route('/new')
  .post(checkBody, createUser)

router.route('/:id')
  .patch(checkBody, checkUser, updateUser)

router.route('/:id')
  .delete(checkUser, deleteUser)

module.exports = router;

