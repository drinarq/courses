module.exports=class RootsExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'RootsException';
        this.status = 403;
    }
};

