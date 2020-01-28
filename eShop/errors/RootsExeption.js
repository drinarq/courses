module.exports=class RootsExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'RootsExeption';
        this.status = 403;
    }
};

