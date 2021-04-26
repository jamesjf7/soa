const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const app = express();

const users = require("./routes/users");
const recipes = require("./routes/recipes");
const plans = require("./routes/plans");
const transactions = require("./routes/transactions");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(
    morgan("common", {
        stream: fs.createWriteStream(
            `./logs/${moment().format("Y.MM.D")}.log`,
            {
                flags: "a",
            }
        ),
    })
);

/**
 * Routes
 * */
app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/plans", plans);
app.use("/api/transactions", transactions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
