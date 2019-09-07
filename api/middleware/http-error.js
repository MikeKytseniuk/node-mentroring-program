const HTTPError = require('../dependencies/http-error/http-error');

module.exports = (app) => {
    app.use((err, req, res, next) => {
        if (err instanceof HTTPError) {
            res.set('Content-Type', 'text/plain');
            res.status(err.errorCode).send(err.errorMessage);
        }
    });
};