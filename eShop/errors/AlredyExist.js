module.exports=class AlreadyExist extends Error {
    constructor(message) {
        super(message);
        this.name = 'AlreadyExist';
        this.status = 400;
    }
};
