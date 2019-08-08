const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const STATIC_FILES_PATH = path.join(process.cwd(), 'static');
const HTTPError = require('../HTTPError');
const MIME_TYPES = require('../mime-types');

router.param('file', (req, res, next, file) => {
    res.locals.fileMimeType = getRequestedFileMimeType(file);
    res.locals.filePath = path.join(STATIC_FILES_PATH, file);

    next();
});

router.get('/async/:file', (req, res, next) => { 
    fs.readFile(res.locals.filePath, (err, data) => {
        if (err) {
            return next(new HTTPError(404, 'Requested File Not Found'));
        }
        
        res.set('Content-Type', res.locals.fileMimeType).send(data);
    });
});

router.get('/sync/:file', (req, res, next) => {
    try {
        const data = fs.readFileSync(res.locals.filePath);
        
        res.set('Content-Type', res.locals.fileMimeType).send(data);
    } catch (e) {
        throw new HTTPError(404, 'Requested File Not Found');
    }
});

router.get('/stream/:file', (req, res, next) => {
    const readStream = fs.createReadStream(res.locals.filePath);

    readStream.on('open', () => {
        res.set('Content-Type', res.locals.fileMimeType);
        readStream.pipe(res);
    }).on('error', (err) => {
        next(new HTTPError(404, 'Requested File Not Found'));
    });
});

const getRequestedFileMimeType = (requestedFile) => {
    const requestedFileExtension = path.extname(requestedFile).slice(1);

    return MIME_TYPES[requestedFileExtension]; 
};

module.exports = router;