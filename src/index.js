const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const port = process.env.PORT || 3000;

const app = express();

// app.use(express.json());
app.use(express.json());

// Create Users
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

// Read All Users
app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

// Read Users by their ID
app.get('/users/:id', (req, res) => {
  //   console.log(req.params);
  const _id = req.params.id;
  console.log(_id);
  User.findById(_id)
    .then((user) => {
      //   if (!user) {
      //     console.log('no user');
      //     return res.status(404).send('Not Found');
      //   }
      res.send(user);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

// Create Tasks
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

// Read All Tasks
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

// Read Tasks By their ID
app.get('/task/:id', (req, res) => {
  const _id = req.params.id;
  //   console.log(_id);
  Task.findById(_id)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

app.listen(port, () => {
  console.log('Server is started on Port', port);
});
