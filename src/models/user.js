const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('user', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is InValid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password canont contain "Password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age Must be Positive Number');
      }
    },
  },
});

// const me = new User({
//   name: 'Ashish',
//   age: 21,
//   email: 'admin@123.gmail.com',
//   password: 'example123',
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// module.exports = User;
module.exports = User;
