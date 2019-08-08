const router = require('express').Router();
const events = require('../events.json');
const eventsDescription = require('../events-description.json');

const getEventsFullInfo = (events, eventsDescription) => {
    return events.reduce((accum, event) => {
        let { id: eventID, event: eventName} = event;
        
        let eventInfo = eventsDescription.find((eventDescription) => {
            return eventDescription.id === eventID;
        });

        accum.push({
            id: eventID,
            event: eventName,
            discovery: eventInfo || {}
        });
        
        return accum;
    }, []);
};

router.get('/', (req, res, next) => {
    res.send(getEventsFullInfo(events, eventsDescription));
});

module.exports = router;