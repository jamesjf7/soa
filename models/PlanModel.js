const url = require("url");
const axios = require("axios");
const chalk = require("chalk");

// database
const db = require("../database/database");

module.exports = {
    select: async () => {
        try {
            let result = await db.query(`
            SELECT *
            FROM plans
            `);
            return result;
        } catch (e) {
            console.error(e);
        }
    },
    insert: async function (data) {
        try {
            let result = await db.query(`insert into plans set ?`, data);
            if (result.affectedRows > 0) return result;
            else return null;
        } catch (err) {
            return err;
        }
    },
    delete: async function (data) {
        try {
            let result = await db.query(
                `delete from plans where id = '${data.id}'`
            );
            if (result.affectedRows > 0) return data;
            else return null;
        } catch (err) {
            return err;
        }
    },
};
