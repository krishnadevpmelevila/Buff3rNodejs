var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const Buffer = require('../models/galleryUpload');
const UpcomingEventGallery = require('../models/upcomingEventGallery');
const MainGallery = require('../models/mainGallery');
const PartnersGallery = require('../models/partnersUpload');
const Slider = require('../models/slider');
const EventReg = require('../models/eventReg');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const events = await Buffer.find();
    const upevents = await UpcomingEventGallery.find();
    const maingallery = await MainGallery.find();
    const partners = await PartnersGallery.find();
    const slider = await Slider.find();
    res.render('index', { title: 'Buffer Events', events: events, upevents: upevents, maingallery: maingallery, partners: partners, slider: slider });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

router.get('/admin', async (req, res) => {
  try {
    
    res.render('admin', { title: 'Buffer Events'});
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});
router.get('/regLeads', async (req, res) => {
  try {

    const leads = await EventReg.find();
    res.render('regLeads', { title: 'Buffer Events', leads: leads});
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Error fetching events');
  }
});

router.post('/eventReg', async (req, res) => {
  const name = req.body['name'];
  const phone = req.body['phone'];
  const college = req.body['college'];
  const email = req.body['email'];
  const type = req.body['type'];

  const event = new EventReg({
    name: name,
    phone: phone,
    college: college,
    email: email,
    type: type

  });

  event.save()
    .then(() => {
      console.log('Data inserted into database');
      res.status(200).send('Data inserted into database');
    })
    .catch((err) => {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
    });

});











mongoose.connect('mongodb+srv://root:q3c8abQZNck3ba9S@cluster0.pl98b.mongodb.net/Buffer?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));






// Set up storage engine for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Set up file upload middleware using multer
const upload = multer({ storage: storage });

// Parse incoming request bodies in middleware
router.use(bodyParser.urlencoded({ extended: true }));










router.get('/galleryUpload', function (req, res, next) {
  res.render('galleryUpload', { title: 'Admin' });
});

router.get('/upcomingEventUpload', function (req, res, next) {
  res.render('upcomingEvent', { title: 'Admin' });
});
router.get('/mainGalleryUpload', function (req, res, next) {
  res.render('mainGalleryUpload', { title: 'Admin' });
});

router.get('/partnersUpload', function (req, res, next) {
  res.render('partnersUpload', { title: 'Admin' });
});
router.get('/slider', function (req, res, next) {
  res.render('sliderUpload', { title: 'Admin' });
});
// Handle POST request to insert data into database
router.post('/galleryUpload', upload.single('event-image'), async (req, res) => {
  const event_name = req.body['event-name'];
  const event_date = req.body['event-date'];
  const event_image = req.file.path.replace('public', '');

  const latestEvent = await Buffer.findOne().sort({ _id: -1 }).limit(1);

  const latestEventNumber = latestEvent ? parseInt(latestEvent.num) : 0;

  // Create new event document and save to database
  const event = new Buffer({
    event_image: event_image,
    event_description: event_name,
    event_date: event_date,
    num: latestEventNumber + 1

  });

  event.save()
    .then(() => {
      console.log('Data inserted into database');
      res.status(200).send('Data inserted into database');
    })
    .catch((err) => {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
    });
});
router.post('/upcomingGalleryUpload', upload.single('event-image'), async (req, res) => {
  const event_name = req.body['event-name'];
  const event_date = req.body['event-date'];
  const event_image = req.file.path.replace('public', '');
  const event_desc = req.body['event-desc'];
  const link = req.body['event-link'];

  const latestEvent = await UpcomingEventGallery.findOne().sort({ _id: -1 }).limit(1);

  const latestEventNumber = latestEvent ? parseInt(latestEvent.num) : 0;

  // Create new event document and save to database
  const event = new UpcomingEventGallery({
    event_image: event_image,
    event_name: event_name,
    event_date: event_date,
    event_desc: event_desc,
    link: link,
    num: latestEventNumber + 1

  });

  event.save()
    .then(() => {
      console.log('Data inserted into database');
      res.status(200).send('Data inserted into database');
    })
    .catch((err) => {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
    });
});





router.post('/mainGalleryUpload', upload.array('event-image'), async (req, res) => {

  const event_images = req.files.map(file => file.path.replace('public', ''));

  const latestEvent = await MainGallery.findOne().sort({ _id: -1 }).limit(1);

  const latestEventNumber = latestEvent ? parseInt(latestEvent.num) : 0;

  // Create new event document for each uploaded file and save to database
  const events = event_images.map((image, index) => {
    return new MainGallery({
      event_image: image, mainGalleryUpload,
      num: latestEventNumber + index + 1
    });
  });

  MainGallery.insertMany(events)
    .then(() => {
      console.log('Data inserted into database');
      res.status(200).send('Data inserted into database');
    })
    .catch((err) => {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
    });
});

router.post('/partnersUpload', upload.array('event-image'), async (req, res) => {

  const event_images = req.files.map(file => file.path.replace('public', ''));

  const latestEvent = await PartnersGallery.findOne().sort({ _id: -1 }).limit(1);

  const latestEventNumber = latestEvent ? parseInt(latestEvent.num) : 0;

  // Create new event document for each uploaded file and save to database
  const events = event_images.map((image, index) => {
    return new PartnersGallery({
      event_image: image,
      num: latestEventNumber + index + 1
    });
  });

  PartnersGallery.insertMany(events)
    .then(() => {
      console.log('Data inserted into database');
      res.status(200).send('Data inserted into database');
    })
    .catch((err) => {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
    });
});


router.post('/slider', upload.single('event-image'), async (req, res) => {

  const event_images = req.file.path.replace('public', '');
  const event_name = req.body['text'];
  const link_text = req.body['linkText'];
  const link = req.body['link'];


  const latestEvent = await Slider.findOne().sort({ _id: -1 }).limit(1);

  const latestEventNumber = latestEvent ? parseInt(latestEvent.num) : 0;

  // Create new event document for each uploaded file and save to database
  const events = new Slider({
    link_text: link_text,
    link: link,
    text:event_name,
    image: event_images,
    num: latestEventNumber + 1
  });


  events.save()
    .then(() => {
      console.log('Data inserted into database');
      res.status(200).send('Data inserted into database');
    })
    .catch((err) => {
      console.error('Error inserting data into database:', err);
      res.status(500).send('Error inserting data into database');
    });
});




module.exports = router;
