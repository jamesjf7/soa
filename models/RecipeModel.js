const url = require("url");
const axios = require("axios");

const listApiKey = [
    "335fd33838774c4baec2166c8b06dec2",
    "3989f55aeb8e44309c970d82224327b2",
    "241f9030d05f47bf98c2bae1f7173670",
];
const apiKey = listApiKey[0];

module.exports = {
    search: async (data) => {
        const params = new url.URLSearchParams({
            query: data.search,
            addRecipeInformation: true,
            apiKey: apiKey,
        });
        console.log(data);
        try {
            let result = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
            );
            return result.data;
        } catch (e) {
            console.error(e);
        }
    },
    detail: async (id) => {
        const params = new url.URLSearchParams({
            includeNutrition: true,
            apiKey: apiKey,
        });
        try {
            let [result] = await Promise.all([
                axios.get(
                    `https://api.spoonacular.com/recipes/${id}/information?${params.toString()}`
                ),
            ]);
            return result.data;
        } catch (e) {
            console.error(e);
        }
    },
    recommendation: async (data) => {
        const params = new url.URLSearchParams({
            ...data,
            apiKey: apiKey,
        });

        console.log(params);

        try {
            let result = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
            );

            return result.data;
        } catch (e) {
            console.error(e);
        }
    },
};
