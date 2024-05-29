import { process, doneClicked } from "./websocket.js";

screenChange()

const processBtn = document.getElementById("processBtn")
const doneBtn = document.getElementById("doneBtn")
const importBtn = document.getElementById("importBtn")
/** @type { HTMLInputElement } **/
const fileInput = document.getElementById("fileInput")

processBtn.addEventListener("click", () => {
	process(fileInput.files.item(0).name)
})

doneBtn.addEventListener("click", () => {
	doneClicked()
})

importBtn.addEventListener("click", () => {
	fileInput.click();
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

	console.log("testing")
	processBtn.removeAttribute("disabled")
})

window.addEventListener("resize", function() {
	screenChange()
})

function screenChange() {
	if (window.matchMedia("(min-width: 1081px)").matches) {
		// large
		let larges = document.querySelectorAll("[class*='@vp-l']");

		larges.forEach((element) => {
			let classes = element.classList
			let id = ""
			classes.forEach((i) => {
				if (i.search("vp-l") == 1) {
					id = i
				}
			})

			let command = id.split(":")[1]
			command.split(",").forEach((i) => {
				element.classList.add(i)
			})
		})

		// remove smalls
		let smalls = document.querySelectorAll("[class*='@vp-s']");

		smalls.forEach((element) => {
			let classes = element.classList
			let id = ""
			classes.forEach((i) => {
				if (i.search("vp-s") == 1) {
					id = i
				}
			})

			let command = id.split(":")[1]
			command.split(",").forEach((i) => {
				element.classList.remove(i)
			})
		})
	} else {
		// small
		console.log("small")
		let larges = document.querySelectorAll("[class*='@vp-l']");

		larges.forEach((element) => {
			let classes = element.classList
			let id = ""
			classes.forEach((i) => {
				if (i.search("vp-l") == 1) {
					id = i
				}
			})

			let command = id.split(":")[1]
			command.split(",").forEach((i) => {
				element.classList.remove(i)
			})
		})


		let smalls = document.querySelectorAll("[class*='@vp-s']");

		smalls.forEach((element) => {
			let classes = element.classList
			let id = ""
			classes.forEach((i) => {
				if (i.search("vp-s") == 1) {
					id = i
				}
			})

			console.log
			let command = id.split(":")[1]
			command.split(",").forEach((i) => {
				element.classList.add(i)
			})
		})
	}
}
