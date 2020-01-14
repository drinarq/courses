class UnauthorizedExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedExeption';
        this.status = 401;
    }
}

module.exports=new UnauthorizedExeption();