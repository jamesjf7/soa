const express = require("express");
const path = require("path");
const multer = require("multer");
const { authenticate, inputValidation } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const planModel = require("../models/PlanModel");

/* view all plans */
router.get("/", [authenticate, inputValidation], async (req, res) => {
    let plans = await planModel.select();
    plans = plans.map((plan) => {
        var o = Object.assign({}, plan);
        o.duration_unit = 'days';
        return o;
    })
    res.status(200).send(plans);
});

/* create */
router.post("/", [authenticate, inputValidation], async (req, res) => {
    let { name, price, duration } = req.body;

    let plan = {
        name,
        price,
        duration,
    };

    let result = await planModel.insert(plan);
    if (result.affectedRows == 0) {
        return res.status(400).json(result);
    } else {
        return res.status(201).json({
            id: result.insertId,
            name: plan.name,
            price: plan.price,
            duration: plan.duration,
        });
    }
});

/* delete */
router.delete(
    "/:id",
    [ inputValidation],
    async (req, res) => {
        let plans = await planModel.delete(req.params);
        res.status(200).send({
            message: "Delete success",
        });
    }
);

module.exports = router;
