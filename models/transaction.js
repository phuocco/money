
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

const TransactionSchema = new mongoose.Schema({
  //  user: {type: Schema.Types.ObjectId, ref: 'User'},
  //_id:{type: mongoose.Types.ObjectId},
  email: String,
  amount: { type: Number, require: true },
  category: { type: String },
  type: String,
  note: String,
  date: { type: Date, default: Date.now },
  timestamp: Number,
  event: { type: Schema.Types.String, ref: 'Event' },
  remind: { type: Date },
  photo: String
},
  //{ timestamp: true }
)
//TransactionSchema.plugin(timestamps);

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;