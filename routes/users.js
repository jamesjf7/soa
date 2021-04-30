const express = require("express");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {
    authenticate,
    authorize,
    apihit,
    inputValidation,
} = require("../middlewares/middlewares");
const { check } = require("express-validator");
const router = express.Router();
// model
const UserModel = require("../models/UserModel");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    // filename: (req, file, cb) => {
    //     console.log(file);
    //     if (file != null) {
    //         let filename = req.body.id;
    //         let extension = file.originalname.split(".").slice(-1)[0];
    //         cb(null, new Date() + "." + extension);
    //     }
    // },
    fileFilter: function (req, file, callback) {
        console.log(file);
        if (file != null) {
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
        }
    },
});

const upload = multer({ storage: storage });

/* view all users */
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluMSIsInBhc3N3b3JkIjoiYWRtaW4xIiwicm9sZSI6IjAiLCJpYXQiOjE2MTkyNDQ1Njd9.f6ShyIAVFSwY9-loZIsSoO9AJx1kTwaHj43DXYKmZgs */
router.get("/", [authenticate, authorize([0])], async (req, res) => {
    let users = await UserModel.select();
    if (users.length == 0)
        return res.status(404).send({ message: "no user found!" });
    users = users.map(({ name, username, email, role }) => ({
        name,
        username,
        email,
        role,
    }));
    return res.status(200).send(users);
});

/* view user detail */
router.get("/:id", [authenticate, authorize([0])], async (req, res) => {
    let users = await UserModel.select(`where id = ${req.params.id}`);
    if (users.length == 0)
        return res.status(404).send({ message: "no user found!" });
    let user = users[0];
    return res.status(200).send(user);
});

/* login */
router.post(
    "/login",
    [
        [
            check("username")
                .notEmpty()
                .withMessage("username can not be empty")
                .trim()
                .escape(),
            check("password")
                .notEmpty()
                .withMessage("password can not be empty")
                .trim()
                .escape(),
        ],
        inputValidation,
    ],
    async (req, res) => {
        let { username, password } = req.body;
        let users = await UserModel.select(
            `where username = '${username}' and password = '${password}'`
        );
        if (users.length == 0) {
            return res.status(401).json({
                message: "Wrong username or password!",
            });
        } else {
            let user = users[0];
            return res.status(200).json({
                message: "Welcome, " + user.name,
                token: user.token,
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
                .withMessage("email is not available"),
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
        inputValidation,
    ],
    async (req, res) => {
        let { name, email, username, password, age, role } = req.body;

        let user = {
            name: name,
            email: email,
            username: username,
            password: password,
            token: "",
            image:
                req.file == null ? null : "/uploads/" + req.file.originalname,
            age: age,
            role: role,
            balance: 0,
            api_hit: 100,
        };

        let result = await UserModel.insert(user);
        if (result.affectedRows == 0) {
            return res.status(400).json(result);
        } else {
            user.token = jwt.sign(
                {
                    id: result.insertId,
                    // email: email,
                    username: username,
                    // password: password,
                    role: role,
                },
                process.env.SECRET
            );

            // console.log(user);
            let update = await UserModel.update(user, result.insertId);
            // console.log(update);

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
