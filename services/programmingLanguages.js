const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultipleUsers(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM cti_db.users_cti LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}
async function getMultipleCards(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM cti_db.cards LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}
async function getcardsofuser(page = 1,params){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM cti_db.cards WHERE cardholderid = "${params.idofuser}";`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}
async function blockdeblockcard(page = 1,params){
    let data = 0;
    let result = undefined;
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM cards WHERE cardnumber = "${params.idofcard}";`
    );
    if (rows[0].isbloked == 1) {
        await db.query(`UPDATE cards SET isbloked = 0 WHERE cardnumber = "4441589665875874"`);
        result = 0;
    }
    else {
        await db.query(`UPDATE cards SET isbloked = 1 WHERE cardnumber = "4441589665875874"`);
        result = 1;
    }
    console.log(rows)
    data = rows;



    return {
        // rows,
        result
    }
}
async function loginUser(page = 1,params){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM cti_db.users_cti WHERE name = "${params.name}" AND password = "${params.pass}"`
    );

    const data = helper.yesOrFake(rows);
    // const meta = {params.id};
    console.log(params.name)
    // console.log(params.pass)

    return {
        data,
        // meta
    }
}
//
// async function create(programmingLanguage){
//     const result = await db.query(
//         `INSERT INTO programming_languages
//     (name, released_year, githut_rank, pypl_rank, tiobe_rank)
//     VALUES
//     (${programmingLanguage.name}, ${programmingLanguage.released_year}, ${programmingLanguage.githut_rank}, ${programmingLanguage.pypl_rank}, ${programmingLanguage.tiobe_rank})`
//     );
//
//     let message = 'Error in creating programming language';
//
//     if (result.affectedRows) {
//         message = 'Programming language created successfully';
//     }
//
//     return {message};
// }
// async function remove(id){
//     const result = await db.query(
//         `DELETE FROM programming_languages WHERE id=${id}`
//     );
//
//     let message = 'Error in deleting programming language';
//
//     if (result.affectedRows) {
//         message = 'Programming language deleted successfully';
//     }
//
//     return {message};
// }

module.exports = {
    getMultipleUsers,
    getMultipleCards,
    loginUser,
    getcardsofuser,
    blockdeblockcard
    // ,
    // create,
    // remove
}