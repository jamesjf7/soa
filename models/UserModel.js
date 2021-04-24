const db = require("../database/database");

module.exports = {
    select: async function (condition = "") {
        try {
            let result = await db.query("select * from users " + condition);
            return result;
        } catch (err) {
            return err;
        }
    },
    insert: async function (data) {
        try {
            let result = await db.query(`insert into users set ?`, data);
            if (result.affectedRows > 0) return data;
            else return null;
        } catch (err) {
            return err;
        }
    },
    update: async function (data) {
        try {
            let result = await db.query(
                `update users set ${data} where id = '${data.id}'`
            );
            if (result.affectedRows > 0) return data;
            else return null;
        } catch (err) {
            return err;
        }
    },
};
