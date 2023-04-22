const mongoose = require("mongoose");
const {dbUser,dbPassword,dbHost,dbName} = require('../config/db.mongo.config');

const mongoConfig = async (app) => {
  try {
  mongoose.set('strictQuery', false)
  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`)
  console.log(`db is connected`)
  } catch (error) {
    console.log(error)
  }
    
};

module.exports = mongoConfig;