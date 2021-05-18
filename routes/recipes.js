const express = require("express");
const {
    authenticate,
    inputValidation,
    apihit,
} = require("../middlewares/middlewares");
const { check } = require("express-validator");
const RecipeModel = require("../models/RecipeModel");
const router = express.Router();
// model

/* search recipes */
router.get(
    "/",
    [
        [
            check("search").trim().escape(),
            check("number")
                .isNumeric()
                .withMessage("number must be number!")
                .trim()
                .escape(),
        ],
        authenticate,
        inputValidation,
        apihit([5]),
    ],
    async (req, res) => {
        let recipes = await RecipeModel.search({
            search: req.query.search,
            number: req.query.number || 5,
        });
        if (recipes.totalResults == 0)
            return res.status(404).json({
                message: "no recipes found!",
            });
        return res.status(200).send(recipes);
    }
);

/* recommendation */
router.get(
    "/recommendation",
    [
        [
            check("number")
                .isNumeric()
                .withMessage("number must be number!")
                .trim()
                .escape(),
            check("minFat")
                .isNumeric()
                .withMessage("minFat must be number!")
                .trim()
                .escape(),
            check("maxFat")
                .isNumeric()
                .withMessage("maxFat must be number!")
                .trim()
                .escape(),
            check("minCarbs")
                .isNumeric()
                .withMessage("minCarbs must be number!")
                .trim()
                .escape(),
            check("maxCarbs")
                .isNumeric()
                .withMessage("maxCarbs must be number!")
                .trim()
                .escape(),
        ],
        authenticate,
        inputValidation,
        apihit([5]),
    ],
    async (req, res) => {
        let recipes = null;
        try {
            recipes = await RecipeModel.recommendation(req.query);
        } catch (e) {
            return res.status(400).send("Bad request!");
        }
        if (recipes == null) return res.status(400).send("Bad request!");
        if (recipes.totalResults == 0)
            return res.status(404).json({
                message: "no recipes found!",
            });
        return res.status(200).send(recipes);
    }
);

/* recipe's detail */
router.get(
    "/:id",
    [
        [check("id").trim().escape().notEmpty()],
        authenticate,
        inputValidation,
        apihit([5]),
    ],
    async (req, res) => {
        let { id } = req.params;
        let recipes = null;
        try {
            recipes = await RecipeModel.detail(id);
        } catch (e) {
            return res.status(404).json({ message: "no recipes found!" });
        }

        if (recipes == null)
            return res.status(404).json({ message: "no recipes found!" });

        return res.status(200).send(recipes);
    }
);

module.exports = router;
