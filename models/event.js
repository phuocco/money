var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

const EventSchema =  new Schema({

    user: {type: Schema.Types.String, ref: 'User'},
    eventName: {type: String, require: true},
    dateEnd:{ type: Date, require: true},
    currency: String
})
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;