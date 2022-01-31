require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('61f76c144701a7b0aa2383fd')
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ complleted: false });
  return count;
};

deleteTaskAndCount('61f7729785ea99d9edf550d9')
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
