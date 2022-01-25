// CRUD operation

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

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
    // db.collection('users').insertOne(
    //   {
    //     name: 'Ashish',
    //     age: 21,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Connection Error');
    //     }
    //     console.log(result.ops);
    //   }
    // );
    //     db.collection('users').insertMany(
    //       [
    //         {
    //           name: 'Captain America',
    //           age: 170,
    //         },
    //         {
    //           name: 'Thor',
    //           age: 1500,
    //         },
    //         {
    //           name: 'Iron Man',
    //           age: 40,
    //         },
    //       ],
    //       (error, result) => {
    //         if (error) {
    //           return console.log('Unable to insert');
    //         }
    //         console.log(result.ops);
    //       }
    //     );
    db.collection('tasks').insertMany(
      [
        {
          descreption: 'Clean the house',
          completed: true,
        },
        {
          descreption: 'Renew Insplection',
          completed: false,
        },
        {
          descreption: 'Pot Plants',
          completed: false,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log(
            'Unable to insert many records in NewTask Collection'
          );
        }
        console.log(result.ops);
      }
    );
  }
);
