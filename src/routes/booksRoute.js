// using Mongo db
const express = require('express');
const booksController = require('../controllers/booksController');

const booksRouter = express.Router();
const { getBooks, getBookById, Middleware } = booksController();

booksRouter.use(Middleware);
booksRouter.route('/books').get(getBooks);
booksRouter.route('/books/:id').get(getBookById);

module.exports = booksRouter;
