/**
 * @typedef Transcript
 * @property {string} num
 * @property {string} start
 * @property {string} end
 * @property {string} caption
 */

let socket = new WebSocket("ws://localhost:8080/whisper");
let output = document.getElementById("output")

socket.onopen = function() {
	console.log("Status: Connected\n")

	// get current transcripts
	socket.send("currentTranscription")
}

/** @param e { MessageEvent } **/
socket.onmessage = function(e) {

	/** @type { []Transcript } **/
	try {
		currentTranscription = JSON.parse(e.data)
		let html = ""
		currentTranscription.forEach((e) => {
			/** @type {Transcript} **/
			const transcript = e
			html += "<div class=\"transcript-item\"><p>" + "[" + transcript.start + "->" + transcript.end + "] " + transcript.caption + "</p><button>Edit</button></div>"
		})

		output.innerHTML = html
	} catch {
		switch (e.data) {
			case "done": {
				console.log("Done")
				isLoading(false)
				break
			}
			case "processing": {
				isLoading(true)
				break
			}
		}
	}
};

/** @param e { boolean } **/
function isLoading(loading) {
	const loader = document.getElementById("loader")
	if (loading) {
		loader.style.visibility = "visible"
	} else {
		loader.style.visibility = "hidden"
	}
}

function process() {
	output.innerHTML = ""
	socket.send("process")
}
