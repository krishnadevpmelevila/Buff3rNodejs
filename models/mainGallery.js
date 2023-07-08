var mongoose = require('mongoose');

const bufferSchema = new mongoose.Schema({
    event_description: String,
    event_date: String,
    event_image: String,
    num: String
});
const MainGallery = mongoose.model('MainGallery', bufferSchema);

module.exports = MainGallery;