const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const accountLoginRouter = require('./routes/login');
const accountRegisterRouter = require('./routes/register');
const aboutRouter = require('./routes/about');
const productRouter = require('./routes/products');
const productDetailRouter = require('./routes/productDetail');
const whyUsRouter = require('./routes/whyUs');
const testimonialRouter = require('./routes/testimonial');


const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(compression()); //Compress all routes
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', accountLoginRouter);
app.use('/register', accountRegisterRouter);
app.use('/about', aboutRouter);
app.use('/products', productRouter);
app.use('/product_1', productDetailRouter);
app.use('/whyUs', whyUsRouter);
app.use('/testimonial', testimonialRouter);
app.use('/users', usersRouter);

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
