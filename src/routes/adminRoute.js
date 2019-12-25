// Using Mongo DB to insert data
const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();
const books = [
  {
    id: 1, title: 'First book', description: 'This is the description for the first book', author: 'Olususi Oluyemi'
  },
  {
    id: 2, title: 'Second book', description: 'This is the description for the second book', author: 'John Barry'
  },
  {
    id: 3, title: 'Third book', description: 'This is the description for the third book', author: 'Clement Wilfred'
  },
  {
    id: 4, title: 'Fourth book', description: 'This is the description for the fourth book', author: 'Christian nwamba'
  },
  {
    id: 5, title: 'Fifth book', description: 'This is the description for the fifth book', author: 'Chris anderson'
  },
  {
    id: 6, title: 'Sixth book', description: 'This is the description for the sixth book', author: 'Olususi Oluyemi'
  },
];
adminRouter.route('/admin').get((req, res) => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'booksApp';
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('connected to the database correctly');
      const db = client.db(dbName);
      const response = await db.collection('books').insertMany(books);
      res.json(response);
    } catch (e) {
      debug(e.stack);
    }
    client.close();
  }());
});

module.exports = adminRouter;
