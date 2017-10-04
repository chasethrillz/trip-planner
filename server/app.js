const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../models').db;
const apiRouter = require('../routes/api');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', apiRouter);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

const port = 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});

db.sync()
.then(function() {
  console.log('Synchronated the database');
})
.catch(function(err) {
  console.error('Trouble right here in River City', err, err.stack);
});
