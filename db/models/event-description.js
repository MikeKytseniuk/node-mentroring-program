const db = require('../index');
const eventDescriptionSchema =  new db.Schema({
    id: String,
    city: String,
    venue: String
}, {
    collection: 'events-description',
});

module.exports = db.model('EventsDescription', eventDescriptionSchema);