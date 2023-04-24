const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          const re = '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/';
          return re.test(v)
        },
        message: 'You must use a valid email!'
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }
    ],
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  })
  // Setter friend count
  .set(function () {
    this.set(this.friends.length);
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
