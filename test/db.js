const mongoose = require('mongoose');
require('dotenv').config();

const db =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb+srv://mattdb:' +
      process.env.MONGO_PW +
      '@cluster0-3tyb9.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
