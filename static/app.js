let savedTimes = [];
let timeBegan = null,
	timeStopped = null,
	stoppedDuration = 0,
	starting = null,
	timeElapsed = null,
	min = 0,
	sec = 0,
	milisecs = 0;

// You should keep track of the starting time then subtract that time from the current time using a Date:
// The reason you were seeing the milliseconds "lagging" before was that setInterval is notorious for not firing exactly when you specify.
// Update: You could keep track of how long the timer has "paused" between resets. Updated my answer to accommodate this.

function clockTimer() {
	let currentTime = new Date();
	timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
	min = timeElapsed.getUTCMinutes();
	sec = timeElapsed.getUTCSeconds();
	milisecs = timeElapsed.getUTCMilliseconds();

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
	elapsedMil = [];
	elapsedMin = [];
	elapsedSec = [];
	elapsedTime = [];
	timeDiff = 0;
	timeArea.innerHTML = "";
	savedTimes = [];
	document.querySelector("#timer-zone span").innerHTML = "00:00:000";
});

const timeArea = document.querySelector("#savedTimes-body");

let elapsedMin = [],
	elapsedSec = [],
	elapsedMil = [],
	elapsedTime = [],
	timeDiff = 0;

function stopWatchTimeDiff(timeDiffArr) {
	if (timeDiffArr.length === 2) {
		timeDiff = Math.abs(timeDiffArr[0] - timeDiffArr[1]);
		timeDiffArr.shift();
	}
	return timeDiff;
}

document.getElementById("save").addEventListener("click", () => {
	const time = document.getElementById("timer-zone").innerText;
	savedTimes.unshift(time);
	elapsedMil.push(milisecs);
	elapsedSec.push(sec);
	elapsedMin.push(min);
	let splitMin =
		stopWatchTimeDiff(elapsedMin) > 9
			? stopWatchTimeDiff(elapsedMin)
			: `0${stopWatchTimeDiff(elapsedMin)}`;
	let splitSec =
		stopWatchTimeDiff(elapsedSec) > 9
			? stopWatchTimeDiff(elapsedSec)
			: `0${stopWatchTimeDiff(elapsedSec)}`;
	let splitMil =
		stopWatchTimeDiff(elapsedMil) > 99
			? stopWatchTimeDiff(elapsedMil)
			: stopWatchTimeDiff(elapsedMil) > 9
			? `0${stopWatchTimeDiff(elapsedMil)}`
			: `00${stopWatchTimeDiff(elapsedMil)}`;
	elapsedTime.unshift(`${splitMin}:${splitSec}:${splitMil}`);

	const dataRow = document.createElement("div");
	// Row for each dataset
	const timeRow = document.createElement("div");
	const elapsedTimeRow = document.createElement("div");
	const commentRow = document.createElement("div");
	// Add the class attributes to convert to CSV
	timeRow.className = "total-time";
	elapsedTimeRow.className = "split-time";
	commentRow.className = "comment-val";
	dataRow.className = "times";
	// Create the data for each row
	timeRow.innerText = savedTimes[length];
	elapsedTimeRow.innerText = elapsedTime[length];
	commentRow.appendChild(document.createElement("input"));
	//Add to the row;
	dataRow.append(timeRow, elapsedTimeRow, commentRow);
	timeArea.insertAdjacentElement("afterbegin", dataRow);
});

// Modal Screen

const modalBtn = document.getElementById("modal-btn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const timeValues = document.getElementById("time-content");
let totalTimesObj = {};

modalBtn.addEventListener("click", () => {
	const totalTimes = document.querySelectorAll(".total-time");
	const splitTimes = document.querySelectorAll(".split-time");
	const totalComments = document.querySelectorAll(".comment-val input");
	const totalTimesSaved = [];

	totalTimes.forEach((time, index) => {
		return totalTimesSaved.push([
			time.innerHTML,
			splitTimes[index].innerHTML,
			totalComments[index].value === "" ? "n/a" : totalComments[index].value,
		]);
	});
	const timesToCsv = totalTimesSaved.map((t) => {
		return {
			TimeElapsed: t[0],
			TimeSplit: t[1],
			Comment: t[2],
		};
	});
	let csv = "";
	let header = Object.keys(timesToCsv[0]).join(",");
	let csvValues = timesToCsv
		.map((v) => {
			return Object.values(v).join(",");
		})
		.join("\n");
	csv += header + "\n" + csvValues;
	console.log(csv);
	timeValues.value = csv;
	modal.style.display = "block";
});

span.addEventListener("click", () => {
	modal.style.display = "none";
});

window.onclick = function (e) {
	if (e.target == modal) {
		modal.style.display = "none";
	}
};
