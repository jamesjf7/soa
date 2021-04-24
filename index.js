const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const app = express();

const users = require("./routes/users");

require("dotenv").config();

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

/* routes */
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
