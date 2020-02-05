module.exports = class ValidationExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationException';
        this.status = 400;
    }
};