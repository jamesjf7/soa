const express = require("express");
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
