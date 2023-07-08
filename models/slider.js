var mongoose = require('mongoose');

const bufferSchema = new mongoose.Schema({
    text: String,
    link_text: String,
    link: String,
    image: String,
    num: String
});
const Slider = mongoose.model('Slider', bufferSchema);

module.exports = Slider;