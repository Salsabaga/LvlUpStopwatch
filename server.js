require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.static("static"));
app.use(express.json());


const savedTimes = [];

app.get("/", async (req, res) => {
	res.sendFile(__dirname + "index.html");
});


app.post("/times", (req, res) => {
	const timerSaved = req.body;
	savedTimes.push(timerSaved);
	console.log(savedTimes);
	res.json({
		status: "Success",
		times: timerSaved,
	});
});

app.delete("/", (req, res) => {
	const timerDelete = req.body;
});

app.listen(3000, () => {
	console.log("App is listening");
});
