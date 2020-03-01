module.exports=class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'Payload Too Large';
        this.status = 413;
    }
};
