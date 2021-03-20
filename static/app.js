//


const savedTimes = [];
const timer = document.querySelector("#timer-zone span");
const timerInfo = timer.innerHTML;
const saveBtn = document.querySelector("button#test");
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
		(min > 9 ? min : " 0" + min) +
		" : " +
		(sec > 9 ? sec : " 0" + sec) +
		" : " +
		(milisecs > 99
			? milisecs
			: milisecs > 9
			? " 0" + milisecs
			: " 00" + milisecs);
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
	document.querySelector("#timer-zone span").innerHTML = "Lets Start Again";
});

document.getElementById("save").addEventListener("click", () => {
	let node = document.createElement("LI"); // Create a <li> node
	let p = document.querySelector("#timer-zone span").innerHTML;
	let textnode = document.createTextNode(p); // Create a text node
	node.appendChild(textnode);
	document.getElementById("saved-times").appendChild(node);
	savedTimes.push(document.querySelector("#timer-zone span").innerHTML);
	console.log(document.querySelector("#timer-zone span").innerHTML);
});
const options = {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		time: timerInfo,
	}),
};

const timerAPI = async () => {
	const res = await fetch("/", options);
	const data = await res.json();
	console.log(data);
};

saveBtn.addEventListener("click", () => {
	timerAPI();
});
