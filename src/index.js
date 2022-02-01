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

const jwt = require('jsonwebtoken');

const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewtoken', {
    expiresIn: '7 days',
  });
  console.log(token);
  const data = jwt.verify(token, 'thisismynewtoken');
  console.log(data);
};

myFunction();
