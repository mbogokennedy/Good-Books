const express = require('express');

const authRouter = express.Router();
const userController = require('../controllers/userController')
const { updateUser, getUser, getUsers, deleteUser, postUser } = userController()

authRouter.route('/post').post(postUser);
authRouter.route('/').get(getUsers)
authRouter.route('/:id').get(getUser);
authRouter.route('/update/:id').put(updateUser);
authRouter.route('/delete/:id').delete(deleteUser);

module.exports = authRouter;
