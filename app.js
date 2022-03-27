var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadfood = require('./routes/uploadfood');
var order = require("./routes/order");
var callWaiter = require("./routes/callWaiter");
var checkBill = require("./routes/checkBill");
var api = require("./routes/api/api");
const fileUpload = require('express-fileupload');
const session = require('express-session');

var app = express();
app.use(fileUpload());
app.use(session({ secret: '1234567890QWERTY' }));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/japanese_res', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/uploadfood', uploadfood)
app.use('/orders', order)
app.use('/callWaiter', callWaiter)
app.use('/checkBill', checkBill);
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
    // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// app.listen(3000, '0.0.0.0', function() {
//     console.log('Listening to port:  ' + 3000);
// });
module.exports = app;