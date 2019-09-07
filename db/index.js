const { db } = require('../config/config');
const dbConnectionUrl = `mongodb://${db.host}:${db.port}/`;
const mongoose = require('mongoose');

mongoose.connect(dbConnectionUrl, {
    useNewUrlParser: true,
    dbName: db.name
}).then(() => {
    console.log('Database successfully connected');
}).catch((e) => {
    console.log('Something went wrong with database connection');
});

module.exports = mongoose;