const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function user(id) {
    let api_key_table = await db.query(
        `SELECT * FROM cti_db.apilocalkeys WHERE number = "${id}"`
    );
    // console.log(api_key_table);
    if(!api_key_table[0]) {
        return 0;
    }
    const user_data_table = await db.query(
        `SELECT * FROM cti_db.users_cti WHERE number = "${api_key_table[0].userid}"`
    );
    // console.log(user_data_table[0])
    return user_data_table[0];
}


async function getMultipleUsers(body){
    // const offset = helper.getOffset(page, config.listPerPage);

    const rows = await db.query(
        `SELECT * FROM cti_db.users_cti`
    );
    // const rows = await db.query(
    //     `SELECT * FROM cti_db.users_cti WHERE name = "${params.name}" AND password = "${params.pass}"`
    // );

    // const data = helper.yesOrFake(rows);
    const data = helper.emptyOrRows(rows);

    return {
        data
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
async function get_cards_of_user(data){
    // console.log(data)
    const user_id = await user(data.number)
    // console.log(user_id.number)

    const rows = await db.query(
        `SELECT * FROM cti_db.cards WHERE cardholderid = "${user_id.number}";`
    );
    // console.log(rows)
    const cards = helper.emptyOrRows(rows);

    return cards;
}
// async function blockdeblockcard(page = 1,params){
//     let data = 0;
//     let result = undefined;
//     const offset = helper.getOffset(page, config.listPerPage);
//     const rows = await db.query(
//         `SELECT * FROM cards WHERE cardnumber = "${params.idofcard}";`
//     );
//     if (rows[0].isbloked == 1) {
//         await db.query(`UPDATE cards SET isbloked = 0 WHERE cardnumber = "${params.idofcard}"`);
//         result = 0;
//
//     }
//     else {
//         await db.query(`UPDATE cards SET isbloked = 1 WHERE cardnumber = "${params.idofcard}"`);
//         result = 1;
//     }
//     console.log(rows)
//     data = rows;
//
//     return {
//         // rows,
//         result
//     }
// }

async function blockdeblockcard(params) {
    const cardNumber = params.idofcard;

    if (!isValidCardNumber(cardNumber)) {
        throw new Error('Invalid card number');
    }

    const offset = helper.getOffset(config.listPerPage);
    const rows = await db.query(`SELECT * FROM cards WHERE cardnumber = "${cardNumber}";`);

    if (!rows || rows.length === 0) {
        throw new Error('Card not found');
    }

    const isBlocked = rows[0].isbloked === 1;
    await db.query(`UPDATE cards SET isbloked = ${isBlocked ? 0 : 1} WHERE cardnumber = "${cardNumber}"`);

    return {
        result: isBlocked ? 0 : 1,
        data: rows,
    };
}

// function isValidCardNumber(cardNumber) {
//     // Add validation logic here
//     return true;
// }


// async function loginUser(params) {
//     let apiid = undefined;
//     if (params.name == undefined || params.pass == undefined) {
//         return 0
//     }
//     // const userQuery = "SELECT * FROM users_cti WHERE name = ? AND password = ?";
//     // const rows = await db.query(userQuery, [params.name, params.pass]);
//     const rows = await db.query(
//         `SELECT * FROM cti_db.users_cti WHERE name = ? AND password = ?`,
//         [params.name || null, params.pass || null]
//     );
//
//     // console.log(555)
//     const data = helper.yesOrFake(rows);
//     if (data) {
//         const apikeyQuery = "SELECT * FROM cti_db.apilocalkeys WHERE userid = ?";
//         const apikeyu = await db.query(apikeyQuery, [rows.number]);
//         const ifempt = helper.yesOrFake(apikeyu);
//         if (!ifempt) {
//             const numbapi = helper.generateRandomCode();
//             const keyxQuery = "SELECT number FROM cti_db.users_cti WHERE name = ? AND password = ?";
//             const keyx = await db.query(keyxQuery, [params.name, params.pass]);
//             await db.query("INSERT INTO `cti_db`.`apilocalkeys` (`number`, `dateto`, `userid`) VALUES (?, DATE_ADD(NOW(), INTERVAL 30 DAY), ?)", [numbapi, keyx[0].number]);
//             apiid = numbapi;
//         }
//     }
//
//     return { data, apiid };
// }

async function loginUser(params){
    let apiid = undefined;
    const rows = await db.query(
        `SELECT * FROM users_cti WHERE name = ? AND password = ?`,
        [params.name || null, params.pass || null]
    );

    const data = helper.yesOrFake(rows);
    if(data) {
        const apikeyu = await db.query(`SELECT * FROM cti_db.apilocalkeys WHERE userid = "${rows.number}"`)
        const ifempt = helper.yesOrFake(apikeyu);
        // if(!ifempt) {
        const numbapi = helper.generateRandomCode();
        // const apikeyu = await db.query(`SELECT * FROM cti_db.apilocalkeys WHERE userid = "${rows.number}"`)
        const keyx = await db.query(`SELECT number FROM cti_db.users_cti WHERE name = ? AND password = ?`, [params.name || null, params.pass || null]);
        await db.query(`INSERT INTO \`cti_db\`.\`apilocalkeys\` (\`number\`, \`dateto\`, \`userid\`) VALUES ("${numbapi}", DATE_ADD(NOW(), INTERVAL 30 DAY), "${keyx[0].number}")`)
        apiid = numbapi;
        console.log(apiid);

        // }
    }

    return {
        data,
        apiid
        // meta
    }
}

async function createUser(params) {
    const { name, password, number } = params;

    // check if user with this name already exists
    const userExists = await db.query(
        `SELECT * FROM users_cti WHERE number = "${number}"`
    );
    if (userExists.length > 0) {
        return { error: 'User with this name already exists' };
    }

    // create a new user
    const result = await db.query(
        `INSERT INTO users_cti (name, password, number, birth) VALUES (?, ?, ?, NOW())`,
        [name, password, number]
    );

    return { result };
}




// async function loginUser(params){
//     let apiid = undefined
//     const rows = await db.query(
//         `SELECT * FROM cti_db.users_cti WHERE name = "${params.name}" AND password = "${params.pass}"`
//     );
//
//     const data = helper.yesOrFake(rows);
//     if(data) {
//         const apikeyu = await db.query(`SELECT * FROM cti_db.apilocalkeys WHERE userid = "${rows.number}"`)
//         const ifempt = helper.yesOrFake(apikeyu);
//         // if(!ifempt) {
//             const numbapi = helper.generateRandomCode();
//             // const apikeyu = await db.query(`SELECT * FROM cti_db.apilocalkeys WHERE userid = "${rows.number}"`)
//             const keyx = await db.query(`SELECT number FROM cti_db.users_cti WHERE name = "${params.name}" AND password = "${params.pass}"`);
//             console.log(keyx)
//             await db.query(`INSERT INTO \`cti_db\`.\`apilocalkeys\` (\`number\`, \`dateto\`, \`userid\`) VALUES ("${numbapi}", DATE_ADD(NOW(), INTERVAL 30 DAY), "${keyx[0].number}")`)
//             apiid = numbapi;
//         // }
//     }
//
//     return {
//         data,
//         apiid
//         // meta
//     }
// }
async function history(body, params){
    //const useridg = await user(body.id)
    // console.log(useridg)

    let data = { number: body.id };
    // console.log(await get_cards_of_user(data))
    const values = await get_cards_of_user(data)
    const cardNumbers = values.map(card => `'${card.cardnumber}'`).join(', ');
    const query = await db.query(`SELECT * FROM history WHERE cardfrom IN (${cardNumbers}) OR cardto IN (${cardNumbers})`);
    const row = helper.emptyOrRows(query);
    // console.log(row)
    return row;

    // const query = await db.query(`SELECT * FROM history WHERE cardfrom IN (${values.join(', ')})`);

    // const user_from_card = await db.query(
    //     `SELECT * FROM cti_db.cards WHERE cardfrom = "${useridg}"`
    // );
    //
    // const history = await db.query(
    //     `SELECT * FROM cti_db.history WHERE cardfrom = "${useridg}"`
    // );



    // console.log(history)

    // const data = helper.yesOrFake(rows);
    // if(data) {
    //     const apikeyu = await db.query(`SELECT * FROM cti_db.apilocalkeys WHERE userid = "${rows.number}"`)
    //     const ifempt = helper.yesOrFake(apikeyu);
    //     // if(!ifempt) {
    //     const numbapi = helper.generateRandomCode();
    //     // const apikeyu = await db.query(`SELECT * FROM cti_db.apilocalkeys WHERE userid = "${rows.number}"`)
    //     const keyx = await db.query(`SELECT number FROM cti_db.users_cti WHERE name = "${params.name}" AND password = "${params.pass}"`);
    //     console.log(keyx)
    //     await db.query(`INSERT INTO \`cti_db\`.\`apilocalkeys\` (\`number\`, \`dateto\`, \`userid\`) VALUES ("${numbapi}", DATE_ADD(NOW(), INTERVAL 30 DAY), "${keyx[0].number}")`)
    //     apiid = numbapi;
    //     // }
    // }

    // return {
    //     // data,
    //     // apiid
    //     // meta
    // }
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
    get_cards_of_user,
    blockdeblockcard,
    history,
    createUser
    // ,
    // create,
    // remove
}