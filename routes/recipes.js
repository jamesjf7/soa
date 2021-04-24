const express = require("express");
const path = require("path");
const multer = require("multer");
const { authenticate, inputValidation } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const planModel = require("../models/PlanModel");

/* view user detail */
router.get("/", [authenticate, inputValidation], async (req, res) => {
    let plans = await planModel.search({
        search: req.query.search,
        number: req.query.number,
    });

    res.status(200).send(plans);
});

/* login */
router.get("/:id", [authenticate, inputValidation], async (req, res) => {
    let { id } = req.params;

    let plans = await planModel.detail(id);

    res.status(200).send(plans);
});

/* register */
router.get(
    "/recommendation",
    [authenticate, inputValidation],
    async (req, res) => {
        let plans = await planModel.recommendation(req.query);

        res.status(200).send(plans);
    }
);

module.exports = router;
