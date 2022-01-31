require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('61f76c144701a7b0aa2383fd')
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
