const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "1111",
        database: "cti_db",
    },
    listPerPage: 10,
};
module.exports = config;