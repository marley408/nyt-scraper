const express = require('express');
const cors = require('cors');
const connectDB = require('./test/db');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();

// connect to db
connectDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
// allows us to accept json data into our API
app.use(express.json({ extended: true }));
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

// define routes
app.get('/', (req, res) => res.send('Hello World!'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
