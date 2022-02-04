const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

// It will delete all the user in database and create userOne
beforeEach(setupDatabase);

// it will test create user task working properly or not
test('should sign up new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Ashish',
      email: 'ashish.t@crestinfosystems.net',
      password: 'ashish123',
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertion about user body
  expect(response.body).toMatchObject({
    user: {
      name: 'Ashish',
      email: 'ashish.t@crestinfosystems.net',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('ashish123');
});

// it will test login user route
test('login existing user', async () => {
  const response = await request(app)
    .post('/user/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

// it will test unauthenticated user try to login and it will recieve 400 status code which is correct
test('try to login without register', async () => {
  await request(app)
    .post('/user/login')
    .send({
      email: 'asda@sdfsd.com',
      password: 'asdasdas',
    })
    .expect(400);
});

// it will test user profile route
test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// it will test anauthenticated user try to read profile
test('should unauthenticated try to access profile', async () => {
  await request(app).get('/users/me').send().expect(401);
});

// it will test delete of account go successful
test('should delete account for user', async () => {
  await request(app)
    .delete('/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

// it will test anauthenticated usr try to delete account
test('should not delete account for user', async () => {
  await request(app).delete('/user/me').send().expect(401);
});

// it will test to upload an image
test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

// It will  update username
test('should update valid user name', async () => {
  await request(app)
    .patch('/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Jess',
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Jess');
});

// it will test to not update invalid field
test('should mot update Invalid user field', async () => {
  await request(app)
    .patch('/user/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Surat',
    })
    .expect(400);
});
