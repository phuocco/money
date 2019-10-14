var Category = require('../models/category');
var mongoose = require('mongoose');
var mongodb2 = 'mongodb+srv://phuoc:master123@moneylover-llyyf.gcp.mongodb.net/money?retryWrites=true&w=majority';

mongoose.connect(mongodb2, { useNewUrlParser: true, useUnifiedTopology: true });

var category = [
    new Category({
        type: "Expense",
        category: [
            { name: "1" },
            { name: "2" },
            { name: "3" },
        ]
    }),
    new Category({
        type: "Income",
        category: [
            { name: "11" },
            { name: "22" },
            { name: "33" },
        ]
    }),

];


var count = 0;
for (var i = 0; i < category.length; i++) {
    category[i].save(function (err, result) {
        count++;
        if (count === category.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}


// var category = [

//     //TODO: Debt& Loan
//     new Category({
//         name: 'Debt',
//         type: 'Debt & Loan',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Debt Collection',
//         type: 'Debt & Loan',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Loan',
//         type: 'Debt & Loan',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Repayment',
//         type: 'Debt & Loan',
//         icon: 'https://renolation.com/1.jpg'
//     }),

//     //TODO: Expense

//     new Category({
//         name: 'Food & Beverage',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),
//     new Category({
//         name: 'Bills & Utilities',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),
//     new Category({
//         name: 'Shopping',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),
//     new Category({
//         name: 'Friends & Lover',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Entertainment',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),
//     new Category({
//         name: 'Travel',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),

//     new Category({
//         name: 'Health & Fitness',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),

//     new Category({
//         name: 'Gift & Donation',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),
//     new Category({
//         name: 'Family',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),

//     new Category({
//         name: 'Education',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg',

//     }),
//     new Category({
//         name: 'Invesment',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Business',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Fees & Charges',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Insurance',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Withdrawal',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Others',
//         type: 'Expense',
//         icon: 'https://renolation.com/1.jpg'
//     }),

//     //TODO: Income
//     new Category({
//         name: 'Award',
//         type: 'Income',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Interest Money',
//         type: 'Income',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Salary',
//         type: 'Income',
//         icon: 'https://renolation.com/1.jpg'
//     }),

//     new Category({
//         name: 'Gifts',
//         type: 'Income',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Selling',
//         type: 'Income',
//         icon: 'https://renolation.com/1.jpg'
//     }),
//     new Category({
//         name: 'Others',
//         type: 'Income',
//         icon: 'https://renolation.com/1.jpg'
//     })
// ];