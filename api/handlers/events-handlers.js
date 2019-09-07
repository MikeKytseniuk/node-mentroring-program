const Event = require('../../db/models/event');
const EventDescription = require('../../db/models/event-description');
const HTTPError = require('../dependencies/http-error/http-error');

module.exports = {
    getEventsFullInfo: async function (req, res, next) {
        try {
            const events = await Event.find();
            const eventsDescription = await EventDescription.find({}, '-_id');
     
            res.send(this.dependencies.getEventsFullInfo(events, eventsDescription));
        } catch (e) {
            next(new HTTPError(500, 'Database error'));
        }
    }
};