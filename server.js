require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./test/db');
const authRoute = require('./routes/auth');
const scrapeArticlesRoute = require('./routes/articles');

const postRoute = require('./routes/post');

const app = express();

// connect to db
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
);
// allows us to accept json data into our API
app.use(express.json({ extended: true }));

// define routes
app.use('/api/user', authRoute);
app.use('/api/articles', scrapeArticlesRoute);
// app.use('/api/post', postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
