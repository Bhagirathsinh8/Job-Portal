const mongoose = require('mongoose');

const { db } = require('../utils/constant');

const ConnectDB = async () => {
  try {
    const DB = await mongoose.connect(db.MONGO_DB_URL);
    console.log(`MongoDB connected: ${DB.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // process.exit(1); // Exit process with failure
  }
}

module.exports = ConnectDB;