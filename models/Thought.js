const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 280
    },
    createdAt: {
      type: String,
      required: true,
      unique: true,
      // match: {const reEmail = '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/' },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 280
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  })
  // Setter friend count
  .set(function () {
    this.set(this.friends.length);
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
