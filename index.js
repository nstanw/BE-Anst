const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session)

const indexRoute = require('./src/routes/routes')
const User = require("./src/models/UserModels")
const uri =
  'mongodb+srv://beestudy:accban123@bebeestudy.rqeauyk.mongodb.net/?retryWrites=true&w=majority';
// const uri = "mongodb://0.0.0.0:27017"

const app = express();
const store = new MongoDBStore({
  uri: uri,
  collection: "session"
})
// Catch errors
store.on('error', function(error) {
  console.log(error);
});

const PORT = 3333;
const db = mongoose.connection;

//connect db
mongoose.connect(uri).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
});

app.use(cors());
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// app.use((req, res, next) => {
//   if (!req.session.user._id) {
//     return next();
//   }
//   User.findById(req.session.user._id).then((user) => {
//     req.user = user;
//     next();
//   }).catch((err) => { return console.log(err); });
// });

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(indexRoute)

app.listen(PORT, () => {
  console.log('Server started on http://localhost:' + PORT);
});

module.exports = app;
