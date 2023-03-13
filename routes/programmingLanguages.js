const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');



/* GET programming languages. */
router.get('/:id/users', async function(req, res, next) {
    try {
        console.log(req.params.id)
        if (req.params.id != "FR18_SH9PP4NG_N3W") {
            throw new Error("FAKE CODE!");
        }
        res.json(await programmingLanguages.getMultipleUsers(req.query.page));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});
router.post('/:id/login/acc/', async function(req, res, next) {
    try {
        console.log(req.params.id)
        if (req.params.id != "FR18_SH9PP4NG_N3W") {
            throw new Error("FAKE CODE!");
        }
        res.json(await programmingLanguages.loginUser(req.query.page, req.body));
        console.log(req.body)
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});
// :name/:pass/
router.post('/:id/users', async function(req, res, next) {
    try {
        if (req.params.id !== "FR18_SH9PP4NG_N3W") {
            throw new Error("FAKE CODE!");
        }
        res.json(await programmingLanguages.getMultipleUsers(req.query.page));
        // res.json(await programmingLanguages.create(req.body));
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
});
router.post('/:id/cards', async function(req, res, next) {
    try {
        res.json(await programmingLanguages.getMultipleCards(req.query.page));
        // res.json(await programmingLanguages.create(req.body));
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
});
router.post('/:id/cardsofuser/:idofuser/', async function(req, res, next) {
    try {
        // console.log(req.query.id);
        res.json(await programmingLanguages.getcardsofuser(req.query.page, req.params));
        // res.json(await programmingLanguages.create(req.body));
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
});
router.post('/:id/unblockcard/:idofcard/', async function(req, res, next) {
    try {
        // console.log(req.query.id);
        res.json(await programmingLanguages.blockdeblockcard(req.query.page, req.params));
        // res.json(await programmingLanguages.create(req.body));
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
});
router.post('/:id/loadhistory/:idofcard/', async function(req, res, next) {
    try {
        // console.log(req.query.id);
        res.json(await programmingLanguages.blockdeblockcard(req.query.page, req.params));
        // res.json(await programmingLanguages.create(req.body));
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
});
// router.delete('/:id', async function(req, res, next) {
//     try {
//         res.json(await programmingLanguages.remove(req.params.id));
//     } catch (err) {
//         console.error(`Error while deleting programming language`, err.message);
//         next(err);
//     }
// });
module.exports = router;