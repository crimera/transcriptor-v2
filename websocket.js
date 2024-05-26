/**
 * @typedef Transcript
 * @property {string} num
 * @property {string} start
 * @property {string} end
 * @property {string} caption
 */

var socket = new WebSocket("ws://localhost:8080/whisper");
var output = document.getElementById("output")

socket.onopen = function() {
	console.log("Status: Connected\n")
};

/** @param e { MessageEvent } **/
socket.onmessage = function(e) {
	/** @type { []Transcript } **/
	try {
		const data = JSON.parse(e.data)
		let html = ""
		data.forEach((e) => {
			/** @type {Transcript} **/
			const transcript = e
			html += "<p>" + "[" + transcript.start + "->" + transcript.end + "] " + transcript.caption + "</p>"
		})

		output.innerHTML = html
	} catch {
		switch (e.data) {
			case "done": {
				console.log("Done")
				break
			}
		}
	}
};

function process() {
	socket.send("process")
}
