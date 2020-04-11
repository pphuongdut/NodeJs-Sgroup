require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: 'mydatabase',
        },
        migrations: {
            directory: __dirname + '/database/migrations',
        },
    },
};
