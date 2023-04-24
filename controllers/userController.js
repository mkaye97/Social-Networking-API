const User = require('../models/User');

module.exports = {

  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Cannot find user!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((updUser => {
        !updUser
          ? res.status(404).json({ message: 'Cannot find user!' })
          : res.status(200).json({ message: 'User has been succesfully updated.'})
      }
      ))
      .catch((err) => res.status(500).json(err))
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(
      { _id: req.params.userId }
      )
      .then(
        !user
          ? res.status(404).json({ message: 'Cannot find user!' })
          : res.status(200).json({ message: 'User has been successfully deleted.' })
      )
      .catch((err) => res.status(500).json(err))
  }

};
