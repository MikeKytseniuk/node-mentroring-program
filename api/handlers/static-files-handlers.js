const fs = require('fs');
const HTTPError = require('../dependencies/http-error/http-error');

module.exports = {
    getFileAsync: function (req, res, next) {
        const requestedFilePath = this.dependencies.getFilePath(req.params.fileName);
        const fileMimeType = this.dependencies.getRequestedFileMimeType(req.params.fileName);

        fs.readFile(requestedFilePath, (err, data) => {
            if (err) {
                return next(new HTTPError(404, 'Requested File Not Found'));
            }

            res.set('Content-Type', fileMimeType).send(data);
        });
    },
    getFileSync: function (req, res, next) {
        const requestedFilePath = this.dependencies.getFilePath(req.params.fileName);
        const fileMimeType = this.dependencies.getRequestedFileMimeType(req.params.fileName);

        try {
            const data = fs.readFileSync(requestedFilePath);

            res.set('Content-Type', fileMimeType).send(data);
        } catch (e) {
            throw new HTTPError(404, 'Requested File Not Found');
        }
    },
    getFileViaStreams: function (req, res, next) {
        const requestedFilePath = this.dependencies.getFilePath(req.params.fileName);
        const fileMimeType = this.dependencies.getRequestedFileMimeType(req.params.fileName);
        const readStream = fs.createReadStream(requestedFilePath);

        readStream.on('open', () => {
            res.set('Content-Type', fileMimeType);
            readStream.pipe(res);
        }).on('error', (err) => {
            next(new HTTPError(404, 'Requested File Not Found'));
        });
    }
};
