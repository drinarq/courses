const paginate = (query,{page,pageSize}) => {
    const limit = pageSize;
    const offset = (page - 1 ) * pageSize;
    return {
        ...query,
        offset,
        limit,
    };
};

module.exports=paginate;