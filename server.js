require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.static("static"))
app.use(express.json())


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {
	const timerSaved = req.body;
	console.log(timerSaved);
	res.json({
		status: "Success",
		times: timerSaved,
	})
});

app.listen(3000, () => {
	console.log("App is listening");
});
