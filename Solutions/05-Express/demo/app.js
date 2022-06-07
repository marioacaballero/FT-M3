var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');

var app = express();

// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// app.use('/', routes);

app.get('/', function(req, res, next) {
  res.send(req.query);
});

app.get('/api/:id',function(req, res, next) {
  console.log(req.params.id);
  req.__id = 'id: ' + req.params.id;
  next();
}, function(req, res, next) {
  res.send(req.__id);
});

app.post('/api', function(req,res) {
  console.log(req.body);
  res.send('sadas');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


app.listen(3000);
