var express = require('express');
var router = express.Router();
var Category = require('../models/category')
var Transaction = require('../models/transaction');
var User = require('../models/user');
var Event = require('../models/event');
var moment = require('moment');

//get all
router.get('/', async (req, res) => {
    var currentTime = Date.parse(new Date());
    Transaction.aggregate([
        {
            $match:
            {
                timestamp: { $lte: currentTime }
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
    //  Transaction.find().then(data => res.json(data)).catch(err => console.log(err));
});

//get by category
router.get('/:category', async (req, res) => {
    Transaction.aggregate([
        {
            $match:
            {
                category: req.body.category
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
})


// get plan
router.get('/plan', async (req, res) => {
    var currentTime = Date.parse(new Date());
    Transaction.aggregate([
        {
            $match:
            {
                timestamp: { $gte: currentTime }
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
})
//get id
router.get('/:id', async (req, res) => {
    Transaction.findById(req.params.id).then(data => res.json(data)).catch(err => this.console.log(err));
})

router.get('/index', async (req, res) => {
    Event.find({ user: req.session.email }, function (err, event) {
        Category.find({}, function (err, data) {
            res.render('../views/transaction/index.ejs', {
                categories: data,
                events: event
            });
        })
    })
});

//get all
router.get('/all', async (req, res) => {
    Transaction.find().then(data => res.json(data)).catch(err => console.log(err))
})

//get this month
router.get('/month', async (req, res) => {
    const time = new Date();
    var tempMonth = time.getMonth();
    var currentMonth = tempMonth + 1;
    var currentYear = JSON.stringify(time.getFullYear());
    Transaction.aggregate([
        {
            $project:
            {
                month: { $month: '$date' },
                year: { $year: '$date' },
                amount: 1,
                user: 1,
                category: 1,
                note: 1,
                date: 1,
                event: 1,
                remind: 1,
                photo: 1,
                timestamp: 1,
            }
        },
        {
            $match:
            {
                month: currentMonth
            }
        },
        {
            $sort:
            {
                date: 1
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err))

})

router.post('/create/', async (req, res) => {
    var timestamp = Date.parse(req.body.date);
    var currentDate = new Date();
    var serverAmount = req.body.amount;
    if (req.body.type == "Expense") {
        serverAmount = 0 - serverAmount;
    }
    const transaction = new Transaction({
        email: req.body.email,
        amount: serverAmount,
        type: req.body.type,
        category: req.body.category,
        note: req.body.note,
        date: req.body.date,
        timestamp: timestamp,
        event: req.body.event,
        remind: req.body.remind,
        photo: req.body.photo,
    })
    try {
        const newTransaction = await transaction.save();
        res.json(newTransaction);
    }
    catch {
        res.json(err => console.log(err));
    }
});



module.exports = router;