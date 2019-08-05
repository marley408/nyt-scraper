const router = require('express').Router();
const verify = require('./verifyToken');

// example

router.get('/', verify, (req, res) => {
  // res.json({ posts: { title: 'my first post', desc: 'random data' } });
  res.send(req.user);
  // User.findbyOne({ _id: req.user });
});

module.exports = router;
