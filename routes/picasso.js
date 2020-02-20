var express = require('express');
var router =  express.Router();
var Picasso =  require('../models/picasso');

router.get('/', (req,res) =>{
    Picasso.find().then(data => res.json(data)).catch(err => console.log(err));
})

router.post('/create', async(req,res) =>{
    const picasso = new Picasso({
        username:req.body.username,
        avatar:req.body.avatar
    })
    try {
         const newEvent =  await picasso.save();
        res.json(newEvent);
    }
    catch {
        res.json("fail")
    }
})



module.exports =  router;
