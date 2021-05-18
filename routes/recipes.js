const express = require("express");
const {
    authenticate,
    inputValidation,
    apihit,
} = require("../middlewares/middlewares");
const { check, param } = require("express-validator");
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
    "/:recipe_id",
    [
        [param("recipe_id").trim().escape().notEmpty()],
        inputValidation,
        authenticate,
        apihit([5]),
    ],
    async (req, res) => {
        let { recipe_id } = req.params;
        let recipes = null;
        try {
            recipes = await RecipeModel.detail(recipe_id);
        } catch (e) {
            return res.status(404).json({ message: "no recipes found!" });
        }

        if (recipes == null)
            return res.status(404).json({ message: "no recipes found!" });
        console.log(recipes);
        return res.status(200).json({
            id: recipes.id,
            title: recipes.title,
            dishTypes: recipes.dishTypes,
            readyInMinutes: recipes.readyInMinutes,
            servings: recipes.servings,
            image: recipes.image,
            summary: recipes.summary,
            caloricBreakdown: recipes.caloricBreakdown,
            nutrition: recipes.nutrition,
            ingredients: recipes.nutrition.ingredients,
            extendedIngredients: recipes.extendedIngredients,
            instructions: recipes.instructions,
            analyzedInstructions: recipes.analyzedInstructions,
            dairyFree: recipes.dairyFree,
            glutenFree: recipes.glutenFree,
            ketogenic: recipes.ketogenic,
            sustainable: recipes.sustainable,
            vegan: recipes.vegan,
            vegetarian: recipes.vegetarian,
            veryHealthy: recipes.veryHealthy,
            veryPopular: recipes.veryPopular,
        });
    }
);

module.exports = router;
