const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //   If we make above value true it will cause error
  //   The error is because of the new version of the mongoose i.e version 6.0. 6. useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true, and useFindAndModify is false.
});

// Defining the model
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
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
});

// Creating a new Instances
const me = new User({
  name: '     Ashish         ',
  email: '     Mike@asdf.sdf    ',
});

// saving the instance
me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log(error);
  });

//------------------------------challenge--------------------------------------

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//   },
//   completed: {
//     type: Boolean,
//   },
// });

// const task = new Task({
//   description: 'Learn Mongoose Library',
//   completed: false,
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
