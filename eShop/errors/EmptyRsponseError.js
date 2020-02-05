module.exports=class EmptyRespounceExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmptyResponseException';
        this.status = 204;
    }
};
