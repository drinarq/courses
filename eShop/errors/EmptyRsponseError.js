module.exports=class EmptyRespounceExeption extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmptyRespounceExeption';
        this.status = 400;
    }
};
