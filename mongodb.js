// CRUD operation

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }
    // console.log('Connected Correctly');
    const db = client.db(databaseName);

    db.collection('users').findOne(
      { _id: new ObjectID('61efa64c33dbbb155c5585e9') }, //because in mongodb ids are store in object i.e ObjectID
      (error, user) => {
        if (error) {
          return console.log('Unable to fetch');
        }
        console.log(user);
      }
    );
    // find will return a cursor and it point to fund object so we have to specify toArray mathod to view perfectly
    db.collection('users')
      .find({ age: 21 })
      .toArray((error, users) => {
        if (error) {
          return console.log('Unable to fetch');
        }
        console.log(users);
      });
    db.collection('users')
      .find({ age: 21 })
      .count((error, users) => {
        if (error) {
          return console.log('Unable to fetch');
        }
        console.log(users);
      });
    // ----------------------------Challenge---------------------------------
    // use find and findOne in task to fetch 1). last data 2). all tasks which are not completed
    db.collection('tasks').findOne(
      {
        _id: new ObjectID('61ef9a891e07443c6c463f7a'),
      },
      (error, task) => {
        if (error) {
          return console.log('Unable to fetch');
        }
        console.log(task);
      }
    );
    db.collection('tasks')
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log('Unable to fetch');
        }
        console.log(tasks);
      });
  }
);
