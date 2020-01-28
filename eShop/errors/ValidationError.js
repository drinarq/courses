module.exports = class ValidationExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationExeption';
        this.status = 400;
    }
};