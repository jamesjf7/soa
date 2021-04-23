const mysql = require("mysql");
const config = require("./config");
class Database {
    constructor(config) {
        this.connection = mysql.createPool(config);
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            this.connection.getConnection((err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

const db = new Database(config.database);

module.exports = db;
