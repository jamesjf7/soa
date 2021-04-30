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
morgan.token("message", (req, res) => res.statusMessage);
morgan.token("datetime", () => moment().format("DD/MM/yyyy"));
app.use(
    morgan(
        "Method::method; URL::url; Status::status; Message::message; DateTime:h:datetime; ResponseTime::response-time ms",
        {
            stream: fs.createWriteStream(
                `./logs/${moment().format("Y.MM.D")}.log`,
                {
                    flags: "a",
                }
            ),
        }
    )
);

/**
 * Routes
 * */
app.get("/", (req, res) => {
    let path = __dirname + "README.md";
    let file = fs.readFileSync(path, "utf8");
    return res.send(marked(file.toString()));
});

app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/plans", plans);
app.use("/api/transactions", transactions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
