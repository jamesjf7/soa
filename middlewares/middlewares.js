const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../database/database");
const moment = require("moment");

module.exports = {
    inputValidation: (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors = errors.array().map((e) => e.msg);
            return res.status(400).json({ errors: errors });
        }
        next();
    },
    authenticate: (req, res, next) => {
        if (!req.headers["x-auth-token"]) {
            return res
                .status(401)
                .send({ message: "Access Denied: No Token Provided!" });
        } else {
            let token = req.headers["x-auth-token"];
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).send({
                        message: "Access Denied: Invalid Token!",
                    });
                }
                req.user = decoded;
            });
        }
        next();
    },
    authorize: (roles) => {
        return async (req, res, next) => {
            let user = req.user;
            if (roles.includes(parseInt(user.role))) {
                next();
            } else
                return res.status(403).json({
                    message:
                        "Access Denied: You don't have correct privilege to perform this operation",
                });
        };
    },
    apihit: (api_hit) => {
        return async (req, res, next) => {
            let user = (
                await db.query(`select * from users where id = ${req.user.id}`)
            )[0];

            var today = moment();
            var last_hit = moment(user.last_hit.substr(0,10));
            if(last_hit.diff(today, 'days') <= -1) {
                // RESET API HIT
                let api_hit_value = await db.query(`SELECT * FROM transactions 
                JOIN plans ON plans.id = transactions.plan_id 
                WHERE user_id = ${req.user.id} AND
                DATEDIFF(CURRENT_TIMESTAMP, created_at) < duration
                ORDER BY created_at DESC 
                LIMIT 1`);
                api_hit_value = api_hit_value[0].api_hit;
                await db.query(
                    `update users set api_hit = ${api_hit_value}, last_hit = CURRENT_DATETIME where id = ${req.user.id}`
                );
            }

            if (user.api_hit - api_hit > 0) {
                await db.query(
                    `update users set api_hit = api_hit - ${api_hit} where id = ${req.user.id}`
                );
                next();
            } else {
                return res.status(429).json({
                    message:
                        "Access Denied: Not enough apihit to perform this operation",
                });
            }
            
        };
    },
};
