const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
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
const sessionModules = session(sessionConfig);
module.exports = {
    sessionModules,
};

//xoa gium a node_module vs , cái em mới chỉ vô á hà anh
//code tap trung vao 1 cai thoi, bat nhieu tool qua đơ máy :V em không biết nữa, mọi khi em làm vẫn bình thường, tối ni hắn bị chi :D
