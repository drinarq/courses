module.exports = class UnauthorizedExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedException';
        this.status = 401;
    }
};