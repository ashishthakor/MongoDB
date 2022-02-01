require('./db/mongoose');
const express = require('express');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is started on Port', port);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('61f8f5e0d5899c6559762f98');
//   // await task.populate('owner');
//   // console.log(task.owner.toString());
//   const user = await User.findById('61f8f5dbd5899c6559762f92');
//   await user.populate('tasks');
//   console.log(user.tasks);
// };

// main();
