const db = require('../index');
const eventSchema =  new db.Schema({
    id: String,
    event: String
});

module.exports = db.model('Event', eventSchema);