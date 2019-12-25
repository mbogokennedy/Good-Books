const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:localStrategy');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'booksApp';

    (async function auth() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to the database correctly');
        const db = client.db(dbName);
        const result = await db.collection('users');
        const user = await result.findOne({ email });
        debug(user);
        debug(user);
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        debug(e);
      }
      client.close();
    }());
  }));
};
