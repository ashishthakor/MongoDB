const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
  name: 'mike',
  email: 'mike@gmail.com',
  password: 'mike123',
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

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

test('login existing user', async () => {
  await request(app)
    .post('/user/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test('try to login without register', async () => {
  await request(app)
    .post('/user/login')
    .send({
      email: 'asda@sdfsd.com',
      password: 'asdasdas',
    })
    .expect(400);
});
