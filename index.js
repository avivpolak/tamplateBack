const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const userRouter = require("./routers/user");

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

app.get("/", (req, res) => {
    res.send("working");
});
app.use("/user", userRouter);
app.listen(port, () => {
    console.log(`litsening in port ${port}`);
});
