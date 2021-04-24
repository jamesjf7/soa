const express = require("express");
const path = require("path");
const multer = require("multer");
const { authenticate, inputValidation } = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const recipeModel = require("../models/RecipeModel");

/* view user detail */
router.get("/", [authenticate, inputValidation], async (req, res) => {
    let recipes = await recipeModel.search({
        search: req.query.search,
        number: req.query.number,
    });

    res.status(200).send(recipes);
});

/* login */
router.get("/:id", [authenticate, inputValidation], async (req, res) => {
    let { id } = req.params;

    let recipes = await recipeModel.detail(id);

    res.status(200).send(recipes);
});

/* register */
router.get(
    "/recommendation",
    [authenticate, inputValidation],
    async (req, res) => {
        let recipes = await recipeModel.recommendation(req.query);

        res.status(200).send(recipes);
    }
);

module.exports = router;
