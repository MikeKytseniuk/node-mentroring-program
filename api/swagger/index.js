const { initialize } = require('express-openapi');
const eventsHandlers = require('../handlers/events-handlers');
const staticFilesHandlers = require('../handlers/static-files-handlers');
const staticFilesHandlersUtils = require('../dependencies/static-files-handlers-utils');
const eventsHandlersUtils = require('../dependencies/events-handlers-utils');
const path = require('path');

module.exports = (app) => {
    initialize({
        app,
        apiDoc: path.join(__dirname, './index.yaml'),
        dependencies: {
            ...eventsHandlersUtils,
            ...staticFilesHandlersUtils
        },
        operations: {
            ...eventsHandlers,
            ...staticFilesHandlers
        }
    });
};