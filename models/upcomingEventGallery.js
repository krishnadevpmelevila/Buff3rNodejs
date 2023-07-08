var mongoose = require('mongoose');

const bufferSchema = new mongoose.Schema({
    event_name: String,
    event_date: String,
    event_image: String,
    link: String,
    event_desc: String,
    num: String
});
const UpcomingEventGallery = mongoose.model('UpcomingEventGallery', bufferSchema);

module.exports = UpcomingEventGallery;