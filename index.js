const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const indexRoute = require('./src/routes/routes');
const User = require('./src/models/UserModels');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const uri =
  'mongodb+srv://beestudy:accban123@bebeestudy.rqeauyk.mongodb.net/?retryWrites=true&w=majority';
// const uri = "mongodb://0.0.0.0:27017"

const store = new MongoDBStore({
  uri: uri,
  collection: 'session',
});
// Catch errors
store.on('error', function (error) {
  console.log(error);
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const fileImgName = Date.now().toString() + '-' + file.originalname;
    cb(null, fileImgName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('avatar')
);

const PORT = 3333;

//connect db
const db = mongoose.connection;
mongoose.connect(uri).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
});

app.use(morgan('dev'));
// for parsing application/json
app.use(express.json());
// cookie-Parser read cookie request
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      isLoggedIn: true,
    },
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(indexRoute);

app.listen(PORT, () => {
  console.log('Server started on http://localhost:' + PORT);
});

module.exports = app;
