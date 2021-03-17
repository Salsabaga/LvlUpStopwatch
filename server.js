require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/", (req, res) => {});

app.listen(3000, () => {
	console.log("App is listening");
});
