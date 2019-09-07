const path = require('path');
const STATIC_FILES_PATH = path.join(process.cwd(), 'static');
const MIME_TYPES = require('./images-mime-types/images-mime-types');

module.exports = {
    getRequestedFileMimeType: (requestedFile) => {
        const requestedFileExtension = path.extname(requestedFile).slice(1);

        return MIME_TYPES[requestedFileExtension]; 
    },
    getFilePath: (fileName) => {
        return path.join(STATIC_FILES_PATH, fileName);
    }
};