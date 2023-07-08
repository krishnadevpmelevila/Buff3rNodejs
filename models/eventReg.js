var mongoose = require('mongoose');

const bufferSchema = new mongoose.Schema({
    name: String,
    phone: String,
    college: String,
    email: String,
    type: String,
    num: String
});
const EventReg = mongoose.model('EventReg', bufferSchema);

module.exports = EventReg;