const url = require("url");
const axios = require("axios");
const chalk = require("chalk");

const apiKey = ["335fd33838774c4baec2166c8b06dec2"];

module.exports = {
    search: async (data) => {
        const params = new url.URLSearchParams({
            query: data.search,
            number: data.number,
            addRecipeInformation: true,
            apiKey: apiKey[0],
        });

        try {
            let result = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?${params}`
            );
            return result.data;
        } catch (e) {
            console.error(e);
        }
    },
    detail: async (id) => {
        const params = new url.URLSearchParams({
            includeNutrition: true,
            apiKey: apiKey[0],
        });
        try {
            let [result] = await Promise.all([
                axios.get(
                    `https://api.spoonacular.com/recipes/${id}/information?${params}`
                ),
            ]);
            return result.data;
        } catch (e) {
            console.error(e);
        }
    },
    recommendation: async (data) => {
        const params = new url.URLSearchParams({
            number: data.number,
            ignorePantry: true,
            apiKey: apiKey[0],
        });

        try {
            let result = await axios.get(
                `https://api.spoonacular.com/recipes/findByIngredients?${params}`
            );
            return result.data;
        } catch (e) {
            console.error(e);
        }
    },
};
