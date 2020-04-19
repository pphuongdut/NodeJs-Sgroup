require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: __dirname + '/database/migrations',
        },
    },
};
// cái nớ em đang viết lở dở thì hắn bị bug,anh sửa được cái mysql chưa, comment cai e dang code lại r chay thu router khac a xem 
//delete giup a node_module