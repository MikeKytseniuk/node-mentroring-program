module.exports = {
    service: {
        port: process.env.PORT
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    }
};