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

    db.collection('users')
      .updateOne(
        {
          _id: new ObjectID('61ef94395863c715683ad7aa'),
        },
        {
          // $set: {
          //   name: 'Spider Man',
          // },
          $inc: {
            age: -7,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // -----------------------------------challanges--------------------------------------
    db.collection('tasks')
      .updateMany(
        {
          completed: false,
        },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result);
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
