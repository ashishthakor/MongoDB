const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
// Create Tasks
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();

    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read All Tasks --> GET /tasks?completed = true|false
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }
  try {
    await req.user.populate({
      path: 'tasks',
      match,
    });

    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Read Tasks By their ID
router.get('/task/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Update Tasks by their ID
router.patch('/task/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }
  try {
    // const task = await Task.findById(req.params.id);

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
// Delete Tasks
router.delete('/task/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
