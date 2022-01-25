const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //   If we make above value true it will cause error
  //   The error is because of the new version of the mongoose i.e version 6.0. 6. useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser , useUnifiedTopology , and useCreateIndex are true, and useFindAndModify is false.
});

const User = mongoose.model('User', {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({
  name: 'Ashish',
  age: 'thakor',
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log(error);
  });
