const express = require('express');
const router = express.Router();
const Category = require('../models/category')
const Transaction = require('../models/transaction');
const User = require('../models/user');
const Event = require('../models/event');
const moment = require('moment');

//get all sort time by now this month
router.post('/', (req, res) => {
    let time = new Date();
    let currentTime = Date.parse(new Date());
    let email = req.body.reqEmail;
    let currentMonth = time.getMonth() + 1;
    let currentYear = time.getFullYear();
    Transaction.aggregate([
        {
            '$project': {
                'month': {
                    '$month': '$date'
                },
                'year': {
                    '$year': '$date'
                },
                'amount': 1,
                'email': 1,
                'user': 1,
                'category': 1,
                'note': 1,
                'date': 1,
                'event': 1,
                'remind': 1,
                'photo': 1,
                'timestamp': 1,
                'type': 1
            }
        }, {
            '$match': {
                'email': email,
                'month': currentMonth,
                'year': currentYear,
                'timestamp': {
                    '$lte': currentTime
                }
            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
});

//get all by email
//TODO: email done
router.post('/email/', (req, res) => {
    let time = new Date();
    let month = parseInt(req.body.month);
    let year = parseInt(req.body.year);
    let currentMonth = time.getMonth() + 1;
    let currentYear = time.getFullYear();
    let email = req.body.reqEmail;

    if (!month || !year) {
        month = currentMonth - 1;
        year = currentYear;
    }
    console.log(month + " " + year);
    Transaction.aggregate([
        {
            '$project': {
                'month': {
                    '$month': '$date'
                },
                'year': {
                    '$year': '$date'
                },
                'amount': 1,
                'email': 1,
                'user': 1,
                'category': 1,
                'note': 1,
                'date': 1,
                'event': 1,
                'remind': 1,
                'photo': 1,
                'timestamp': 1
            }
        }, {
            '$match': {
                'email': email,
                'month': month,
                'year': year,

            }
        }, {
            '$sort': {
                'date': -1
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
});

//get all before time
router.post('/getAll', (req, res) => {
    let time = new Date();
    let currentTime = Date.parse(new Date());
    let email = req.body.reqEmail;

    Transaction.aggregate([
        {
            '$project': {
                'month': {
                    '$month': '$date'
                },
                'year': {
                    '$year': '$date'
                },
                'amount': 1,
                'email': 1,
                'user': 1,
                'category': 1,
                'note': 1,
                'date': 1,
                'event': 1,
                'remind': 1,
                'photo': 1,
                'timestamp': 1,
                'type': 1
            }
        }, {
            '$match': {
                'email': email,
                'timestamp': {
                    '$lte': currentTime
                }
            }
        }, {
            '$sort': {
                'date': -1
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


// get category
//TODO: done
router.get('/category', (req, res) => {
    let currentTime = Date.parse(new Date());
    let email = req.body.reqEmail;
    let category = req.body.category;
    Transaction.aggregate([
        {
            '$match':
            {
                'timestamp': { '$lte': currentTime },
                'email': email,
                'category': category
            },
        }, {
            '$sort': {
                'date': 1
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err));
})

// query by cate
//TODO: email
router.get('/plan', (req, res) => {
    let currentTime = Date.parse(new Date());
    Transaction.aggregate([
        {
            '$match':
            {
                'timestamp': { '$gte': currentTime }
            },
        }, {
            '$sort': {
                'date': 1
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
//TODO: email
router.post('/chart/', (req, res) => {
    let month = parseInt(req.body.month);
    let year = parseInt(req.body.year);
    let time = new Date();
    let currentMonth = time.getMonth() + 1;
    let currentYear = time.getFullYear();
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
//TODO: email
router.get('/selectMonth', (req, res) => {
    let month = parseInt(req.body.month);
    let year = parseInt(req.body.year);
    let time = new Date();
    let currentMonth = time.getMonth() + 1;
    let currentYear = time.getFullYear();
    let currentTime = Date.parse(new Date());

    if (!month || !year) {
        month = currentMonth;
        year = currentYear;
    }
    console.log(month + " " + year);
    Transaction.aggregate([
        {
            '$project': {
                'month': {
                    '$month': '$date'
                },
                'year': {
                    '$year': '$date'
                },
                'amount': 1,
                'user': 1,
                'category': 1,
                'note': 1,
                'date': 1,
                'event': 1,
                'remind': 1,
                'photo': 1,
                'timestamp': 1
            }
        }, {
            '$match': {
                'month': month,
                'year': year,
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err))

});

//get this month
//TODO: email
router.get('/month', (req, res) => {
    const time = new Date();
    let currentTime = Date.parse(new Date());

    let tempMonth = time.getMonth();
    let currentMonth = tempMonth + 1;
    let currentYear = time.getFullYear();
    Transaction.aggregate([
        {
            '$project': {
                'month': {
                    '$month': '$date'
                },
                'year': {
                    '$year': '$date'
                },
                'amount': 1,
                'user': 1,
                'category': 1,
                'note': 1,
                'date': 1,
                'event': 1,
                'remind': 1,
                'photo': 1,
                'timestamp': 1
            }
        }, {
            '$match': {
                'month': currentMonth,
                'year': currentYear,
                'timestamp': {
                    '$lte': currentTime
                }
            }
        }, {
            '$sort': {
                'date': 1
            }
        }
    ]).then(data => res.json(data)).catch(err => console.log(err))

});




//get id
router.get('/id/:id', async (req, res) => {
    Transaction.findById(req.params.id).then(data => res.json(data)).catch(err => this.console.log(err));
});

//delete
router.delete('/id/delete/:id', (req, res) => {
    Transaction.findByIdAndDelete(req.params.id).then(res.json(success)).catch(err => console.log(err));
})

//update
router.put('/id/update/:id', (req, res,next) => {
    let id = req.params.id;
    let serverAmount = req.body.amount;
    if (req.body.type === "Expense" && req.body.amount > 0) {
        serverAmount = 0 - serverAmount;
    }
    const updateTrans = {
        amount: serverAmount,
        category : req.body.category,
        note : req.body.note,
        date : req.body.date,
        timestamp : Date.parse(req.body.date),
        //photo : req.body.photo
    };

    Transaction.updateOne({_id:id},{$set:updateTrans}).then(timestamp => res.json("success")).catch(err => console.log(err));
   
})

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



module.exports = router