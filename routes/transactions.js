const express = require("express");
const path = require("path");
const multer = require("multer");
const { authenticate, inputValidation, authorize } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const transactionModel = require("../models/TransactionModel");
const planModel = require("../models/PlanModel");
const userModel = require("../models/UserModel");

/* view transactions */
router.get("/", [authenticate, inputValidation], async (req, res) => {
    let transactions = [];
    let user = await userModel.select(`WHERE username = '${req.user.username}'`); user = user[0];
    
    if(user.role == 1) {
        transactions = await transactionModel.select(`WHERE user_id = ${user.id}`);
        transactions = transactions.map((transaction) => {
            let time = new Date(transaction.created_at);
            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            return {
                plan: transaction.plan_name,
                price: transaction.price,
                duration: transaction.duration + " Days",
                time: time.toLocaleString(),
                end: time.addDays(transaction.duration).toLocaleString(),
            };
        });
    } else {
        transactions = await transactionModel.select();
        transactions = transactions.map((transaction) => {
            let time = new Date(transaction.created_at);
            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            return {
                user: transaction.user_name,
                plan: transaction.plan_name,
                price: transaction.price,
                duration: transaction.duration + " Days",
                start: time.toLocaleString(),
                end: time.addDays(transaction.duration).toLocaleString(),
            };
        });
    }
    
    res.status(200).send(transactions);
});

/* create */
router.post("/", [authenticate, inputValidation, authorize([1])], async (req, res) => {
    let { plan_id } = req.body;

    let found_plan = await planModel.select(`WHERE id = ${plan_id}`); found_plan = found_plan[0];
    if(!found_plan) return res.status(400).json({ message: "PLAN NOT FOUND" });
    let user = await userModel.select(`WHERE username = '${req.user.username}'`); user = user[0];
    if(found_plan.price >= user.balance) {
        return res.status(400).json({
            message: "YOUR BALANCE IS NOT ENOUGH"
        });
    }
    let user_id = user.id;
    let transaction = {
        user_id,
        plan_id,
    };

    let result = await transactionModel.insert(transaction);
    let result2 = await userModel.update(`balance = (balance - ${found_plan.price})`, user_id);
    if (result.affectedRows == 0) {
        return res.status(400).json(result);
    } else {
        return res.status(201).json({
            message: "SUCCESS JOIN " + found_plan.name + " PLAN",
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
