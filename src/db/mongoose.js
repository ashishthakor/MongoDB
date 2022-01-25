const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //   If we make above value true it will cause error
  //   The error is because of the new version of the mongoose i.e version 6.0. 6. useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true, and useFindAndModify is false.
});

/*
---------------------------------------challenge------------------------------
Add a new password field to user
1. setup field as a required string
2. ensure the length is grater than 6
3. trim the password
4. ensure that password doesn't contain "password"
5. Test your work
 */

// Defining the model
const User = mongoose.model('User', {
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
        throw new Error('Email Is Invalid');
      }
    },
  },
  // ------challenge------
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

// // Creating a new Instances
// const me = new User({
//   name: '     Ashish         ',
//   email: '     Mike@asdf.sdf    ',
//   password: ' abcXyz123   ',
// });

// // saving the instance
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//------------------------------challenge--------------------------------------
/*
Add validation and sanitization to task

1. trim description and make it required
2. Make completed optional and default it to false
3. Test your work with and without error
 */
const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Task({
  description: '                    extra Learn Mongoose Library',
  completed: true,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log(error);
  });
