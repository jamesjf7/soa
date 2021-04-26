const express = require("express");
const { authenticate, inputValidation } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model

/* view user detail */
router.get(
    "/",
    [
        [
            check("search").notEmpty().trim().escape(),
            check("number").toInt().trim().escape(),
        ],
        authenticate,
        inputValidation,
    ],
    async (req, res) => {
        let plans = await planModel.search({
            search: req.query.search,
            number: req.query.number,
        });

        res.status(200).send(plans);
    }
);

/* recipe's detail */
router.get(
    "/:id",
    [[check("id").trim().escape()], authenticate, inputValidation],
    async (req, res) => {
        let { id } = req.params;

        let plans = await planModel.detail(id);

        res.status(200).send(plans);
    }
);

/* recommendation */
router.get(
    "/recommendation",
    [
        [
            check("minFat").toInt().trim().escape(),
            check("maxFat").toInt().trim().escape(),
        ],
        authenticate,
        inputValidation,
    ],
    async (req, res) => {
        let plans = await planModel.recommendation(req.query);

        res.status(200).send(plans);
    }
);

module.exports = router;
