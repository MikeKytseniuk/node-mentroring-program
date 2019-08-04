const events = require('./events.json');
const eventsDescription = require('./events-description.json');
const express = require('express');
const app = express();
const staticFilesRouter = require('./static-files-router/static-files-router');
const HTTPError = require('./HTTPError');

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


app.get('/', (req, res, next) => {
    res.send(getEventsFullInfo(events, eventsDescription));
});

app.use('/static', staticFilesRouter);

app.use((err, req, res, next) => {
    if (err instanceof HTTPError) {
        res.status(err.errorCode).send(err.errorMessage);
    }
});

app.listen(3050, () => console.log('Listening on port 3050'));