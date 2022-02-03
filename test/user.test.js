const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'mike',
  email: 'mike@gmail.com',
  password: 'mike123',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

// It will delete all the user in database and create userOne
beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// it will test create user task working properly or not
test('should sign up new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Ashish',
      email: 'ashish.t@crestinfosystems.net',
      password: 'ashish123',
    })
    .expect(201);
});

// it will test login user route
test('login existing user', async () => {
  await request(app)
    .post('/user/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
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
});

// it will test anauthenticated usr try to delete account
test('should not delete account for user', async () => {
  await request(app).delete('/user/me').send().expect(401);
});
