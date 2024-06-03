/**
 * @typedef Transcript
 * @property {string} num
 * @property {string} start
 * @property {string} end
 * @property {string} caption
 */

import { transcriptItem } from "./components.js";
import { doneBtn, exportBtn } from "./elements.js";

let socket = new WebSocket("ws://localhost:8080/whisper");

// views
let output = document.getElementById("output")
/** @type { HTMLDivElement } **/
let historyView = document.getElementById("history")

// server stuff
/** @type { Array } **/
// TODO: store history on the server
let history = []
export let currentTranscription = []


// init
setHistory()

function setHistory() {
	// set history
	history.forEach((transcription) => {
		transcription.forEach((e) => {
			/** @type {Transcript} **/
			const transcript = e
			historyView.appendChild(transcriptItem(transcript))
		})
	})
}

socket.onopen = function() {
	console.log("Status: Connected\n")

	// get current transcripts
	socket.send(JSON.stringify({ type: "currentTranscription" }))
}

/** @param e { MessageEvent } **/
socket.onmessage = function(e) {
	/** @type { []Transcript } **/
	try {
		const msg = JSON.parse(e.data)

		console.log(msg)

		switch (msg.type) {
			case "currentTranscription": {
				output.innerHTML = ''

				currentTranscription = msg.transcriptions

				if (currentTranscription.length != 0) {
					exportBtn.removeAttribute('disabled')

					currentTranscription.forEach((e) => {
						/** @type {Transcript} **/
						const transcript = e
						output.appendChild(transcriptItem(
							transcript,
							transcript.num.toString(),
							(id, caption) => {
								socket.send(JSON.stringify({ type: "change", num: parseInt(id), caption: caption }))
								socket.send(JSON.stringify({ type: "currentTranscription" }))
								console.log(id + caption)
							}
						))
					})
				}


				break
			}
			case "done": {
				console.log("Done")
				doneBtn.removeAttribute("disabled")
				exportBtn.removeAttribute("disabled")
				isLoading(false)
				break
			}
			case "error": {
				console.log("An error occured")
				isLoading(false)
				break
			}
			case "processing": {
				isLoading(true)
				break
			}
		}
	} catch {
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

export function process(filename, translate) {
	const message = {
		type: "process",
		filename: filename,
		translate: translate
	}

	output.innerHTML = ""
	socket.send(JSON.stringify(message))
}

export function doneClicked() {
	if (currentTranscription.length != 0) {
		history.push(currentTranscription)
		socket.send(JSON.stringify({ type: "clearCurrentTranscription" }))
		currentTranscription = []
		output.innerHTML = ""

		setHistory()
	}
}
