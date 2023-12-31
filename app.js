var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var log=require('./middleWare/logger')
const mongoose = require('mongoose');
const { db } = require('./config/database');
const cors = require('cors');



let auth=require('./middleWare/auth')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customRouter = require('./routes/custom');
var todosRouter=require('./routes/todos')
var moviesRouter=require('./routes/movies')
var reviewsRouter=require('./routes/reviews')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(log.log);
app.use(log.auth);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// mongoose.connect("mongodb://localhost:27017/react_express", { useNewUrlParser: true });

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/custom',customRouter);
app.use('/todos',todosRouter);
app.use('/movies',auth.verifyUserToken,moviesRouter);
// app.use('/movies',moviesRouter)
app.use('/reviews',auth.verifyUserToken,reviewsRouter);
// app.use('/reviews',reviewsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
