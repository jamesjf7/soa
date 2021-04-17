const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const userModel = require("../models/UserModel");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        let filename = req.body.id;
        let extension = file.originalname.split(".")[1];
        cb(null, filename + "." + extension);
    },
});
const upload = multer({ storage: storage });
router.get("/", async (req, res) => {
    let result = await userModel.select();
    if (result.length > 0) return res.status(200).send(result);
    else return res.status(404).send("No data selected!");
});
router.get("/:id", async (req, res) => {
    let result = await userModel.selectId(req.params.id);
    if (result.length > 0) return res.status(200).send(result);
    else return res.status(404).send("No data selected!");
});

module.exports = router;
