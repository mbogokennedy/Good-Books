const express = require('express');
const debug = require('debug')('app:authenRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');

const authenRouter = express.Router();

module.exports = function route(nav) {
  authenRouter.route('/signup')
    .get((req, res) => {
      (async function auth() {
        debug(req.body);
        res.render(
          'signup',
          {
            nav
          }
        );
      }());
    })
    .post((req, res) => {
      const {
        firstName, lastName, email, password
      } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'booksApp';
      // debug(user);
      (async function auth() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to the database correctly');
          const db = client.db(dbName);
          const col = db.collection('users');
          const user = {
            firstName,
            lastName,
            email,
            password
          };
          const result = await col.insertOne(user);

          req.login(result.ops[0], () => {
            debug(result.ops[0]);
            res.redirect('/auth/profile/');
          });
        } catch (e) {
          res.status(400).send(e);
        }
        client.close();
      }());
    });
  authenRouter.route('/signin')
    .get((req, res) => {
      (async function auth() {
        res.render(
          'signin',
          {
            nav
          }
        );
      }());
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile/',
      failureRedirect: '/'
    }));
  authenRouter.route('/auth/profile/')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/signin');
      }
    })
    .get((req, res) => {
      debug(req.user);
      res.json(req.user);
    });
  return authenRouter;
};
