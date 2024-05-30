import { process, doneClicked } from "./websocket.js";
import { downloadString } from "./utils.js"

export const processBtn = document.getElementById("processBtn")
export const doneBtn = document.getElementById("doneBtn")
export const importBtn = document.getElementById("importBtn")
/** @type { HTMLInputElement } **/
export const fileInput = document.getElementById("fileInput")
export const exportBtn = document.getElementById('exportBtn')

processBtn.addEventListener("click", () => {
	process(fileInput.files.item(0).name)
})

doneBtn.addEventListener("click", () => {
	doneClicked()
})

importBtn.addEventListener("click", () => {
	fileInput.click();
})

exportBtn.addEventListener('click', () => {
	downloadString("bruh", "text/plaintext", "input.srt")
	console.log('gaming')
})

// do something when inputFile value is changed
fileInput.addEventListener("change", (e) => {
	console.log("testing")
	if (fileInput.files.item(0).name.search("^.*\.(mp4|MP4|webm|WEBM|wav|WAV|mp3|MP3|opus|OPUS|mkv|MKV)$") == -1) {
		console.log("invalid input")
		processBtn.setAttribute("disabled", "")
		return
	}

	const fd = new FormData();

	console.log(e.target.files)

	// add all selected files
	Array.from(e.target.files).forEach((file) => {
		fd.append(e.target.name, file, file.name);
	});

	// create the request
	const xhr = new XMLHttpRequest();
	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			// we done!
		}
	};

	// path to server would be where you'd normally post the form to
	xhr.open('POST', 'upload.php', true);
	xhr.send(fd);

	console.log("uploaded, I guess")
	processBtn.removeAttribute("disabled")
})
