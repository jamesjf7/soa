const express = require("express");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const middlewares = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const userModel = require("../models/UserModel");
const UserModel = require("../models/UserModel");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        let filename = req.body.id;
        let extension = file.originalname.split(".").slice(-1)[0];
        cb(null, new Date() + "." + extension);
    },
    fileFilter: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        if (
            extension !== ".png" &&
            extension !== ".jpg" &&
            extension !== ".gif" &&
            extension !== ".jpeg"
        ) {
            return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
    },
});

const upload = multer({ storage: storage });

/* testing */
router.get("/", (req, res) => {
    return res.status(200).send("Hellow World!");
});

/* login */
router.post(
    "/login",
    [
        [
            check("username").notEmpty().trim().escape(),
            check("password").notEmpty().trim().escape(),
        ],
        middlewares.inputValidation,
    ],
    async (req, res) => {
        let { username, password } = req.body;
        let users = await userModel.select(
            `where username = '${username}' and password = '${password}'`
        );
        if (users.length == 0) {
            return res.status(404).json({
                message: "No user found!",
            });
        } else {
            let user = users[0];
            return res.status(200).json({
                message: "Welcome, " + user.name,
            });
        }
    }
);

/* register */
router.post(
    "/register",
    [
        upload.single("image"),
        [
            check("name", "name is empty").notEmpty().trim().escape(),
            check("email")
                .notEmpty()
                .withMessage("email is empty")
                .isEmail()
                .withMessage("wrong email format")
                .trim()
                .escape()
                .custom(async (value) => {
                    let result = await UserModel.select(
                        `WHERE email = '${value}'`
                    );
                    if (result.length > 0) return Promise.reject();
                })
                .withMessage(),
            check("username").notEmpty().trim().escape(),
            check("username", "username is not available").custom(
                async (value) => {
                    let result = await UserModel.select(
                        `WHERE username = '${value}'`
                    );
                    if (result.length > 0) return Promise.reject();
                }
            ),
            check("password")
                .notEmpty()
                .withMessage("password is empty")
                .trim()
                .escape()
                .isLength({ min: 5 })
                .withMessage("password must be at least 5 chars long")
                .matches(/\d/)
                .withMessage("password must contain a number"),
            check(
                "confirm_password",
                "Password confirmation doesn't match"
            ).custom((value, { req }) => value === req.body.password),
            check("age")
                .notEmpty()
                .withMessage("age is empty")
                .isInt()
                .withMessage("age must be number")
                .trim()
                .escape(),
            check("role")
                .notEmpty()
                .withMessage("role is empty")
                .isIn([0, 1])
                .withMessage("role is not valid")
                .trim()
                .escape(), // role 0 admin, 1 user;
        ],
        middlewares.inputValidation,
    ],
    async (req, res) => {
        let { name, email, username, password, age, role } = req.body;

        let token = jwt.sign(
            {
                email: email,
                username: username,
                password: password,
                role: role,
            },
            process.env.SECRET
        );

        let user = {
            name: name,
            email: email,
            username: username,
            password: password,
            token: token,
            image: "/uploads/" + req.file.originalname,
            age: age,
            role: role,
            balance: 0,
        };

        let result = await userModel.insert(user);
        if (result.affectedRows == 0) {
            return res.status(400).json(result);
        } else {
            return res.status(201).json({
                name: user.name,
                email: user.email,
                username: user.username,
                token: user.token,
                age: user.age,
                role: user.role === 1 ? "user" : "admin",
                balance: 0,
            });
        }
    }
);

module.exports = router;