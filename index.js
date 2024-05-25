screenChange()

window.addEventListener("resize", function() {
	screenChange()
})

function screenChange() {
	if (window.matchMedia("(min-width: 1000px)").matches) {
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
	}
}