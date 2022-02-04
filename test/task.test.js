const { response } = require('express');
const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
} = require('./fixtures/db');

// It will delete all the user in database and create userOne
beforeEach(setupDatabase);

test('should create task for user', async () => {
  const response = request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      descreption: 'From My test',
    })
    .expect(201);
  //   console.log(response.body);
  //   const task = await Task.findById(response.body._id);
  //   expect(task).not.toBeNull();
  //   expect(task.completed).toEqual(false);
});

// fetch user task
test('should fetch user task', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

// user should not delete other uaser's tasks
test('should not delete other user task', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
