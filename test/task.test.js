const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

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
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});
