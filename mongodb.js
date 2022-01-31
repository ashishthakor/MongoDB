const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Rest-Api';

MongoClient.connect(connectionURL, (error, client) => {
  if (error) {
    return console.log('Error Occured!!');
  }
  //   console.log('Connection Successfull');
  const db = client.db(databaseName);
  db.collection('users').insertOne({
    name: 'Ashish',
    age: 21,
  });
});
