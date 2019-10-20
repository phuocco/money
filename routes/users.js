var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');


/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find().then(data => res.json({ users: data })).catch(err => console.log(err))
});


//TODO: SIGN UP
router.get('/signup', function (req, res, next) {
  res.render('../views/users/signup.ejs');
})

router.post('/create/', async (req, res) => {

  let email = await User.findOne({ email: req.body.email });
  let username = await User.findOne({ username: req.body.username });
  if (email && username) {
    return res.status(400).send('That user already exisits!');
  } else {
    user = new User(_.pick(req.body, ['email', 'username', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // res.send(_.pick(user, ['_id', 'email', 'username']));
    const token = jwt.sign({ _id: user._id }, 'PrivateKey');
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'username']));
    // const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    //  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'username']));
  }
});

router.get('/signin', function (req, res, next) {
  res.render('../views/users/signin.ejs');
})


router.post('/login', async (req, res) => {
  //  Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Incorrect email or password.');
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.');
  }
  else {
    email = req.body.email;
    const token = await jwt.sign({ email }, 'PrivateKey');
    res.json(email);
    req.session.userId = user._id;
    req.session.email = user.email;
    // res.send(email);

    // res.json(req.session.email);

    // res.redirect('/transaction/index');
  }
  // res.send(token);
});

module.exports = router;