const express = require('express');
const router = express.Router();
const Category = require('../models/category')
const Transaction = require('../models/transaction');
const User = require('../models/user');
const Event = require('../models/event');
const moment = require('moment');

//get all
router.get('/', (req, res) => {
    let currentTime = Date.parse(new Date());
    Transaction.aggregate([
        {
            '$match':
            {
                'timestamp': { '$lte': currentTime }
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
});

//get chart
router.get('/chart', (req, res) => {
    let currentTime = Date.parse(new Date());
    Transaction.aggregate([
        {
            '$group': {
                '_id': {
                    'category': '$category'
                },
                'averageQuantity': {
                    '$avg': '$amount'
                },
                'sum': {
                    '$sum': '$amount'
                }
            }
        }, {
            '$group': {
                '_id': '$_id.category',
                'sum': {
                    '$first': '$sum'
                }
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
});




// get plan
router.get('/plan', (req, res) => {
    let currentTime = Date.parse(new Date());
    Transaction.aggregate([
        {
            $match:
            {
                timestamp: { $gte: currentTime }
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
})


router.get('/index', async (req, res) => {
    await Event.find({ user: req.session.email }, function (err, event) {
        Category.find({}, function (err, data) {
            res.render('../views/transaction/index.ejs', {
                categories: data,
                events: event
            });
        })
    })
});


//get chart by month,year
router.post('/chart1/', (req, res) => {
    let month = parseInt(req.body.month);
    let year = parseInt(req.body.year);
    console.log('month: ' + month);
    console.log('year: ' + year);

    let time = new Date();
    //let tempMonth = time.getMonth();
    let currentMonth = time.getMonth() + 1;
    let currentYear = time.getFullYear();
    console.log('current Month: ' + currentMonth);
    console.log('current Year: ' + currentYear);
    if (!month || !year) {
        month = currentMonth;
        year = currentYear;
    }
    console.log(month + " " + year);


    Transaction.aggregate(
        [
            {
                '$project': {
                    'year': {
                        '$year': '$date'
                    },
                    'month': {
                        '$month': '$date'
                    },
                    'email': 1,
                    'amount': 1,
                    'category': 1,
                    'type': 1,
                    'note': 1,
                    'date': 1,
                    'timestamp': 1,
                    'remind': 1,
                    'photo': 1
                }
            }, {
                '$match': {
                    'type': 'Expense',
                    'month': month,
                    'year': year,
                }
            },
            {
                '$group': {
                    '_id': {
                        'category': '$category'
                    },
                    'averageQuantity': {
                        '$avg': '$amount'
                    },
                    'sum': {
                        '$sum': '$amount'
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id.category',
                    'sum': {
                        '$first': '$sum'
                    }
                }
            }
        ]
    ).then(data => res.json(data)).catch(err => console.log(err));
});

//get all
router.get('/all', async (req, res) => {
    await Transaction.find().then(data => res.json(data)).catch(err => console.log(err));
})

//get this month
router.get('/month', (req, res) => {
    const time = new Date();
    let tempMonth = time.getMonth();
    let currentMonth = tempMonth + 1;
    let currentYear = JSON.stringify(time.getFullYear());
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

});

//get id
router.get('/id/:id', async (req, res) => {
    Transaction.findById(req.params.id).then(data => res.json(data)).catch(err => this.console.log(err));
});

router.post('/create/', async (req, res) => {
    let timestamp;
    if (req.body.date == null) {
        timestamp = Date.now();

    } else {
        timestamp = Date.parse(req.body.date);
    }
    let currentDate = new Date();
    let serverAmount = req.body.amount;
    if (req.body.type == "Expense") {
        serverAmount = 0 - serverAmount;
    }
    const transaction = new Transaction({
        email: req.body.email,
        amount: serverAmount,
        category: req.body.category,
        type: req.body.type,
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
        err => console.log(err)
    }
});


router.post('/create2/', async (req, res) => {

    let timestamp = moment(req.body.date).format('MM-DD-YYYY');

    const transaction = new Transaction({

        user: req.session.email,
        amount: req.body.amount,
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
        res.json("fail");
    }
});


module.exports = router