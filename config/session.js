const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'test',
};
const sessionStore = new MySQLStore(options);

const sessionConfig = {
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: null },
};
const sessionModules =session(sessionConfig)
module.exports = {
    sessionModules
}