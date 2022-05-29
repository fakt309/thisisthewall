const { mongodb: USER } = require("../config");
const { MongoClient } = require('mongodb');

const mongodb = new MongoClient(USER);

module.exports = async () => {
  await mongodb.connect();
  return mongodb
}
