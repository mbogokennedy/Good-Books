const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:booksController');

function booksController() {
  function getBooks(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'booksApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to the database correctly');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const books = await collection.find().toArray();
        // debug(books);
        // res.render('booksListView',
        //   {
        //     title: 'Books',
        //     books
        //   });
        res.send(books);
      } catch (e) {
        debug(e.stack);
      }
      client.close();
    }());
  }
  function getBookById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'booksApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to the database correctly');
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectID(id) });
        // res.render('bookView',
        //   {
        //     title: 'Book',
        //     book
        //   });
        res.send(book);
      } catch (e) {
        debug(e.stack);
      }
      client.close();
    }());
  }
  function Middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/signin');
    }
  }
  return {
    getBooks, getBookById, Middleware
  };
}

module.exports = booksController;
