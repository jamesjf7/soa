const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const axios = require("axios");
const app = express();

const users = require("./routes/users");
const recipes = require("./routes/recipes");
const plans = require("./routes/plans");
const transactions = require("./routes/transactions");

require("dotenv").config();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));

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
    // return res.status(200).send("OK");

    return res.render('index');

    // let path = __dirname + "README.md";
    // let file = fs.readFileSync(path, "utf8");
    // return res.send(marked(file.toString()));
});

app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/plans", plans);
app.use("/api/transactions", transactions);
/* view bmi user */
app.get("/api/bmi", async (req, res) => {
    let { age, weight, height } = req.query;

    const options = {
        method: 'GET',
        url: 'https://fitness-calculator.p.rapidapi.com/bmi',
        params: {age: parseInt(age), weight: parseInt(weight), height: parseInt(height)},
        headers: {
          'x-rapidapi-key': '0c500cbfb6msh287fbbd3fee74acp123927jsn6c4f3e4feca1',
          'x-rapidapi-host': 'fitness-calculator.p.rapidapi.com'
        }
    };
    
    axios.request(options).then(function (response) {
        // let bmi = await UserModel.bmi(age,weight,height);
        return res.status(200).send(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
