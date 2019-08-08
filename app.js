const express = require('express');
const app = express();
const staticFilesRouter = require('./routers/static-files-router');
const eventsRouter = require('./routers/events-router.js');
const HTTPError = require('./HTTPError');

app.use('/', eventsRouter);

app.use('/static', staticFilesRouter);

app.use((err, req, res, next) => {
    if (err instanceof HTTPError) {
        res.status(err.errorCode).send(err.errorMessage);
    }
});

app.listen(3050, () => console.log('Listening on port 3050'));