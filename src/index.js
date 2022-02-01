require('./db/mongoose');
const express = require('express');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT || 3000;
const app = express();

// Add a middleware for practice
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.send('GET Request are disabled');
  } else {
    next();
  }
});
// -------------------Run 1 of this 2 at a time --------------------
// Site under maintainance mode
app.use((req, res, next) => {
  res.status(500).send('Site is Curently down. Check back soon');
});

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
