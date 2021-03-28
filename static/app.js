let savedTimes = [];
const totalSavedTimes = [];

let timeBegan = null,
	timeStopped = null,
	stoppedDuration = 0,
	starting = null;

// You should keep track of the starting time then subtract that time from the current time using a Date:
// The reason you were seeing the milliseconds "lagging" before was that setInterval is notorious for not firing exactly when you specify.
// Update: You could keep track of how long the timer has "paused" between resets. Updated my answer to accommodate this.

async function clockTimer() {
	let currentTime = new Date(),
		timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
		min = await timeElapsed.getUTCMinutes(),
		sec = await timeElapsed.getUTCSeconds(),
		milisecs = await timeElapsed.getUTCMilliseconds();

	document.querySelector("#timer-zone span").innerHTML =
		(min > 9 ? min : "0" + min) +
		":" +
		(sec > 9 ? sec : "0" + sec) +
		":" +
		(milisecs > 99
			? milisecs
			: milisecs > 9
			? "0" + milisecs
			: "00" + milisecs);
}

document.getElementById("start").addEventListener("click", () => {
	if (timeBegan === null) {
		timeBegan = new Date();
	}
	if (timeStopped !== null) {
		stoppedDuration += new Date() - timeStopped;
	}

	console.log(stoppedDuration);

	starting = setInterval(clockTimer, 10);
});

document.getElementById("stop").addEventListener("click", () => {
	timeStopped = new Date();
	clearInterval(starting);
});

document.getElementById("reset").addEventListener("click", () => {
	clearInterval(starting);
	timeBegan = null;
	timeStopped = null;
	stoppedDuration = 0;
	document.querySelector("#timer-zone span").innerHTML = "00:00:000";
	timeArea.innerHTML = "";
	savedTimes = [];
});

const timeArea = document.querySelector("#saved-times");
const historyArea = document.querySelector("#history-times");

document.getElementById("save").addEventListener("click", () => {
	const time = document.getElementById("timer-zone").innerText;
	savedTimes.push(time);
	timeArea.innerHTML = `${savedTimes
		.map((times) => {
			return `<div id="temp-time">${times}</div>`;
		})
		.join("")}`;
});

document.getElementById("save-times").addEventListener("click", () => {
	let currentTime = new Date();
	totalSavedTimes.push({
		dateCreation: `${currentTime.getUTCDate()}/${
			currentTime.getUTCMonth()
		}/${currentTime.getUTCFullYear()}`,
		savedTime: savedTimes,
	});
	historyArea.innerHTML = `<ul>${totalSavedTimes
		.map((collection) => {
			return `<li>${collection["dateCreation"]} : ${collection["savedTime"]}</li>`;
		})
		.join("")}</ul>`;
	timerAPI();
	savedTimes = [];

	console.log(totalSavedTimes);
});

const timerAPI = async () => {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			time: totalSavedTimes,
		}),
	};
	const res = await fetch("/times", options);
	const data = await res.json();
};

document.getElementById("delete").addEventListener("click", () => {
	timeArea.removeChild(timeArea.lastChild);
	savedTimes.pop()
	console.log(savedTimes)
});
