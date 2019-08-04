module.exports = class HTTPError extends Error {
    constructor (errorCode, errorMessage) {
        super();

        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
};