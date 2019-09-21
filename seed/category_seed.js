var Category = require('../models/category');
var mongoose       = require('mongoose');
var mongodb2 ='mongodb+srv://phuoc:master123@moneylover-llyyf.gcp.mongodb.net/money?retryWrites=true&w=majority';

mongoose.connect(mongodb2,{useNewUrlParser: true,useUnifiedTopology: true});


var category =[

    //TODO: Debt& Loan
    new Category({
       name:'Debt',
       type:'Debt & Loan',
       icon: 'https://renolation.com/1.jpg'
    }),
    new Category({
        name:'Debt Collection',
        type:'Debt & Loan',
        icon: 'https://renolation.com/1.jpg'
     }),
    new Category({
        name:'Loan',
        type:'Debt & Loan',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Repayment',
        type:'Debt & Loan',
        icon: 'https://renolation.com/1.jpg'
     }),

     //TODO: Expense

     new Category({
        name:'Food & Beverage',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Restaurants',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Cafe',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),
     new Category({
        name:'Bills & Utilities',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Phone',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Water',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Electricity',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Gas',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Television',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Internet',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Rental',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),
     new Category({
        name:'Shopping',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Clothing',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Footwear',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Accessories',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Electronics',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),
     new Category({
        name:'Friends & Lover',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Entertainment',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Movies',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Games',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),
     new Category({
        name:'Travel',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),

     new Category({
        name:'Health & Fitness',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Sports',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Doctor',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Pharmacy',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),

     new Category({
        name:'Gift & Donation',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Mariage',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Funeral',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Charity',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),
     new Category({
        name:'Family',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Children & Babies',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Home Services',
                icon: 'https://renolation.com/1.jpg'
            },
            {
                name: 'Pets',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),

     new Category({
        name:'Education',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg',
        children: [
            {
                name: 'Books',
                icon: 'https://renolation.com/1.jpg'
            }
        ]
     }),
     new Category({
        name:'Invesment',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Business',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Fees & Charges',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Insurance',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Withdrawal',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Others',
        type:'Expense',
        icon: 'https://renolation.com/1.jpg'
     }),

     //TODO: Income
     new Category({
        name:'Award',
        type:'Income',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Interest Money',
        type:'Income',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Salary',
        type:'Income',
        icon: 'https://renolation.com/1.jpg'
     }),

     new Category({
        name:'Gifts',
        type:'Income',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Selling',
        type:'Income',
        icon: 'https://renolation.com/1.jpg'
     }),
     new Category({
        name:'Others',
        type:'Income',
        icon: 'https://renolation.com/1.jpg'
     })
];

var count = 0;
for(var i = 0; i < category.length; i++){
    category[i].save(function(err, result){
        count++;
        if(count === category.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}