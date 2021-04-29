const express = require("express");
const { authenticate, inputValidation } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const RecipeModel = require("../models/RecipeModel");
const router = express.Router();
// model

/* search recipes */
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
        let recipes = await RecipeModel.search({
            search: req.query.search,
            number: req.query.number || 5,
        });

        return res.status(200).send(recipes);
    }
);

/* recommendation */
router.get("/recommendation", async (req, res) => {
    let recipes = await RecipeModel.recommendation(req.query);

    return res.status(200).send(recipes);
});

/* recipe's detail */
router.get(
    "/:id",
    [[check("id").trim().escape()], authenticate, inputValidation],
    async (req, res) => {
        let { id } = req.params;

        let recipes = await RecipeModel.detail(id);

        return res.status(200).send(recipes);
    }
);

module.exports = router;
