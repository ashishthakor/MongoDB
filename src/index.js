const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const port = process.env.PORT || 3000;

const app = express();

// app.use(express.json());
app.use(express.json());

app.post('/users', (req, res) => {
  // console.log(req.body);
  // res.send('testing');
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      // console.log(user);
      res.status(201).send(user);
    })
    .catch((error) => {
      // console.log(error);
      res.status(400).send(error);
    });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log('Server is started on Port', port);
});
