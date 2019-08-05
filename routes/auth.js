const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  // validater user
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // check db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // hash pw
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  // save user
  try {
    const savedUser = await user.save();

    // create and assign token
    const token = jwt.sign(
      { _id: savedUser._id, name: savedUser.name },
      process.env.TOKEN_SECRET
    );

    res.send({ token, userId: savedUser._id, userName: savedUser.name });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // validater user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email does not exist');

  // pw is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('invalid password');

  // create token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
