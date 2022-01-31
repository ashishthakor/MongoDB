require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('61f3da81f68a0f75281e1f58', { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
