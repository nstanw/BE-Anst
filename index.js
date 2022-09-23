const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./src/routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3333;
const db = mongoose.connection;

//connect db
const uri =
  'mongodb+srv://beestudy:accban123@bebeestudy.rqeauyk.mongodb.net/?retryWrites=true&w=majority';
// const uri = "mongodb://0.0.0.0:27017"
mongoose.connect(uri).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
  console.log('DB connection error:', err.message);
});

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', routes);

app.listen(PORT, () => {
  console.log('Server started on http://localhost:' + PORT);
});

module.exports = app;
