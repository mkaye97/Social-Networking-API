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
          ? res.status(404).json({ message: 'Cannot find a user with the requested ID.' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user => {
        !user
          ? res.status(404).json({ message: 'Cannot find a user with the requested ID.' })
          : res.status(200).json({ message: 'User has been succesfully updated.' })
      }
      ))
      .catch((err) => res.status(500).json(err))
  },

  deleteUser(req, res){
    User.findByIdAndDelete({ _id: req.params.userId })
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'Cannot find a user with the requested ID.' })
      : Thought.deleteMany({ _id: { $in: user.thoughts } })
  )
  .then(() => res.json({ message: "User and all of the User's thoughts have been deleteModel." }))
  .catch((err) => res.status(500).json(err))
},

  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: 'Cannot find a user with the requested ID.' })
          : res.status(200).json(user))
      .catch((err) => res.status(500).json(err))
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: 'Cannot find a user with the requested ID.' })
          : res.status(200).json(user))
      .catch((err) => res.status(500).json(err))
  },
};
