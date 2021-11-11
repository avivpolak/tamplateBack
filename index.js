const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
require("dotenv").config();
const userRouter = require("./routers/user");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");
const unknownEndpoint = require("./middlewares/unknownEndpoint");

const port = process.env.PORT || 3000;

const mongo = process.env.DATABASE;

mongoose
    .connect(mongo)
    .then((result) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });
morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});
app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            tokens.body(req, res),
        ].join(" ");
    })
);

app.get("/", (req, res) => {
    res.send("working");
});
app.use("/user", jsonParser, userRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
    console.log(`litsening in port ${port}`);
});
