const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const adminRouter = require('./routes/admin');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const app = express();
const methodOverride = require('method-override');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'test',
};

const sessionStore = new MySQLStore(options);

app.set('trust proxy', 1); // trust first proxy
app.use(
    session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use('/', adminRouter);
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

app.use(
    methodOverride(req => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    }),
);
module.exports = app;
