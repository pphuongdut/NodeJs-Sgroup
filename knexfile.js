module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: 'test',
        },
        migrations: {
            directory: '/database/migrations',
        },
    },
};
