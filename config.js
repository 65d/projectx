const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "45.136.71.95",
        port: 3306,
        user: "sqluser",
        password: "111155",
        database: "bankdata",
    },
    listPerPage: 10,
};
module.exports = config;