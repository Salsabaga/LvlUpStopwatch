require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.static("static"));
app.use(express.json());

app.set("view engine", "ejs")

const savedTimes = [];
let timerSaved;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "index.html");
});

app.get("/times", (req, res) =>{
	res.render("times", {timeTemplate: savedTimes})
})


app.post("/times", (req, res) => {
	timerSaved = req.body;
	savedTimes.push(timerSaved);
	console.log(savedTimes)
	res.json({
		status: "Success",
		saveTimeCreation: timerSaved,
	});
});

app.delete("/", (req, res) => {
	const timerDelete = req.body;
});

app.listen(3000, () => {
	console.log("App is listening");
});
