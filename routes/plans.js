const express = require("express");
const path = require("path");
const multer = require("multer");
const { authenticate, inputValidation, authorize } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const planModel = require("../models/PlanModel");

/* view all plans */
router.get("/", [[], authenticate, inputValidation], async (req, res) => {
    let plans = await planModel.select();
    plans = plans.map((plan) => {
        var o = Object.assign({}, plan);
        o.duration_unit = "days";
        return o;
    });
    res.status(200).send(plans);
});

/* create */
router.post("/", [
        [
        check("name").not().isEmpty().withMessage("name is empty"),
        check("price").not().isEmpty().withMessage("price is empty").toInt(),
        check("duration").not().isEmpty().withMessage("duration is empty").toInt(),
        ], 
        authenticate, 
        inputValidation, 
        authorize([0])
    ], async (req, res) => {
    let { name, price, duration, api_hit } = req.body;
    let plan = {
        name,
        price,
        duration,
        api_hit,
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
            api_hit: plan.api_hit,
        });
    }
});

/* delete */
router.delete("/:id", [authenticate, inputValidation, authorize([0])], async (req, res) => {
    if(req.params.id == null) {
        return res.status(400).send({
            message: "id is empty",
        });
    }
    let plans = await planModel.delete(req.params);
    if(plans == null) {
        return res.status(400).send({
            message: "Plan not found",
        });
    }
    return res.status(200).send({
        message: "Delete success",
    });
});

module.exports = router;
