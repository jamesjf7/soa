// database
const db = require("../database/database");

module.exports = {
    select: async (condition = "") => {
        try {
            let result = await db.query(`
            SELECT *, users.name as user_name, plans.name as plan_name
            FROM transactions
            JOIN plans
            ON plans.id = transactions.plan_id
            JOIN users
            ON users.id = transactions.user_id
            ${condition}
            `);
            return result;
        } catch (e) {
            console.error(e);
        }
    },
    insert: async function (data) {
        try {
            let result = await db.query(`insert into transactions set ?`, data);
            if (result.affectedRows > 0) return result;
            else return null;
        } catch (err) {
            return err;
        }
    },
};
