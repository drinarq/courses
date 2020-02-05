module.exports=class InvalidFormatExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidFormatException';
        this.status = 409;
    }
};