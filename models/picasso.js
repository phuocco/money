var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

const PicassoSchema =  new Schema({

    user: String,

    avatar: String
})
var Picasso = mongoose.model('Picasso', PicassoSchema);
module.exports = Picasso;