const express = require("express");
const path = require("path");
const multer = require("multer");
const { authenticate, inputValidation } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const transactionModel = require("../models/TransactionModel");
const planModel = require("../models/PlanModel");

/* view all transactions */
router.get("/", [authenticate, inputValidation], async (req, res) => {
    let transactions = [];
    if(req.user.role == 0) {
        transactions = await transactionModel.select(`WHERE user_id = ${req.user.id}`);
        transactions = transactions.map((transaction) => {
            return {
                name: transaction.name,
                price: transaction.price,
                duration: transaction.duration + "Days",
                time: transaction.created_at,
            };
        });
    } else {
        transactions = await transactionModel.select();
        transactions = transactions.map((transaction) => {
            return {
                user: transaction.user_name,
                name: transaction.plan_name,
                price: transaction.price,
                duration: transaction.duration + "Days",
                time: transaction.created_at,
            };
        });
    }
    
    res.status(200).send(transactions);
});

/* create */
router.post("/", [authenticate, inputValidation], async (req, res) => {
    let { user_id, plan_id } = req.body;

    let found_plan = planModel.select(`WHERE id = '${plan_id}'`)[0];
    if(!found_plan) return res.status(400).json({ message: "PLAN NOT FOUND" });
    if(found_plan.price > req.user.balance) {
        return res.status(400).json({
            message: "YOUR BALANCE IS NOT ENOUGH"
        });
    }

    let transaction = {
        user_id,
        plan_id,
    };

    let result = await transactionModel.insert(transaction);
    if (result.affectedRows == 0) {
        return res.status(400).json(result);
    } else {
        return res.status(201).json({
            id: result.insertId,
            name: transaction.name,
            price: transaction.price,
        });
    }
});

/* delete */
router.delete(
    "/:id",
    [authenticate, inputValidation],
    async (req, res) => {
        let transactions = await transactionModel.delete(req.params);
        res.status(200).send({
            message: "Delete success",
        });
    }
);

module.exports = router;
