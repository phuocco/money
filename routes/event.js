var express = require('express');
var router =  express.Router();
var Event =  require('../models/event');

router.get('/', async(req,res) =>{
    Event.find().then(data => res.json(data)).catch(err => console.log(err));
})


router.get('/index', async(req,res) =>{
    res.render('../views/event/index.ejs')
})

router.post('/create', async(req,res) =>{
    const event = new Event({
        user:req.session.email,
        eventName: req.body.eventName,
        dateEnd: req.body.dateEnd,
        currency: req.body.currency
    })
    try {
         const newEvent =  await event.save();
        res.json(newEvent);
    }
    catch {
        res.json("fail")
    }
})

module.exports =  router;
