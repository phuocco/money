var express = require('express');
var router = express.Router();
var Category = require('../models/category');




router.get('/', async(req,res) =>{
   // Category.find().then(data => res.json(data)).catch(err =>console.log(err));
    const category = Category.find().catch(err => console.log(err));
    res.json(category)
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
     
      const token = jwt.sign({ _id: user._id }, 'PrivateKey');
      res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'username']));
    }
});





module.exports = router;