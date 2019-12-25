const debug = require('debug')('app:usersController');
const { User } = require('../database/models');

function usersController() {
  function postUser(req, res) {
    const { name, email, password } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    (async function query() {
      try {
        const userCollection = await User
          .create({
            name, email, password, createdAt, updatedAt
          });
        if (userCollection) {
          res.status(201).send(userCollection);
        } else {
          res.status(400).send('User could not be created');
        }
      } catch (e) {
        res.status(400).send(e);
      }
    }());
  }
  function getUsers(req, res) {
    (async function query() {
      try {
        const userCollection = await User.findAll({});
        if (userCollection) {
          res.status(200).json({ userCollection });
        } else {
          res.status(404).send('User with the specified ID does not exists');
        }
      } catch (e) {
        res.status(500).send(e);
      }
    }());
  }
  function getUser(req, res) {
    (async function query() {
      try {
        const userCollection = await User.findByPk(req.params.id);
        if (userCollection) {
          res.status(200).json({ userCollection });
        } else {
          res.status(404).send('User with the specified ID does not exists');
        }
      } catch (e) {
        res.status(500).send(e);
      }
    }());
  }
  function updateUser(req, res) {
    const { name, email, password } = req.body;
    const updatedAt = new Date();
    (async function query() {
      try {
        const userCollection = await User.findByPk(req.params.id);
  
        if (userCollection) {
          const updatedUser = await User.update(
            {
              name, email, password, updatedAt
            },
            {
              returning: true,
              where: { id: req.params.id }
            }
          );
          res.status(200).send(updatedUser);
        } else {
          res.status(404).send('User Not Found');
        }
      } catch (e) {
        res.status(500).send(e);
      }
    }());
  }
  function deleteUser(req, res) {
    (async function query() {
      try {
        const deletedUser = await User.destroy({ where: { id: req.params.id } });
        if (deletedUser) {
          res.status(200).send('User Deleted');
        } else {
          res.status(404).send('User Not Found');
        }
      } catch (e) {
        res.status(500).send(e);
      }
    }());
  }
  return {
    postUser, getUser, getUsers, updateUser, deleteUser
  };
}

module.exports = usersController;
