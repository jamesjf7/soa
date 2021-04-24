const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
        return async function (req, res, next) {
            let user = req.user;
            if (roles.includes(parseInt(user.role))) {
                req.user = user;
                next();
            } else
                return res
                    .status(403)
                    .send(
                        "Access Denied: You don't have correct privilege to perform this operation"
                    );
        };
    },
    apihit: (req, res, next) => {},
};
