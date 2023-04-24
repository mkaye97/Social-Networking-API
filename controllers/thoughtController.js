const { Thought, User } = require('../models')

module.exports = {

    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.status(200).json(thought))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "Could not find thought with the requested ID." })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(201).json({ message: "Could not find thought with the requested ID." })
                    : res.status(200).json('Thought succesfully created.')
            )
            .catch((err) => res.status(500).json(err))
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) =>
                !thought 
                    ? res.status(400).json({ message: "Could not find thought with the requested ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "Could not find thought with the requested ID." })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(400).json({ message: "Could not find thought with the requested ID." })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err))
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "Could not find thought with the requested ID." })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: "Could not find thought with the requested ID." })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
}