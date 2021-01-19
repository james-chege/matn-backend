export default class HttpError extends Error {
    constructor(error, errorCode) {
        super(error); // "message" property
        this.code = errorCode; // "code" property
    }
}
