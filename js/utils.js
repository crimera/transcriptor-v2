/** 
 * @param text { string }
 * @param fileType { string }
 * @param fileName { string }
 **/
export function downloadString(text, fileType, fileName) {
	const blob = new Blob([text], { type: fileType })

	const a = document.createElement('a')
	a.download = fileName
	a.href = URL.createObjectURL(blob)
	a.dataset.downloadurl = [fileType, a.download, a.href].join(':')
	a.style.display = 'none'
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	setTimeout(() => { URL.revokeObjectURL(a.href) }, 1500)
}

/**
 * @typedef Transcript
 * @property {string} num
 * @property {string} start
 * @property {string} end
 * @property {string} caption
 */

/**
 * @param { Transcript[] } transcript 
 **/
export function transcriptToSrt(transcript) {
	let out = []

	transcript.forEach((t) => {
		out.push(
			t.num + 1,
			t.start + " --> " + t.end,
			t.caption,
			''
		)
	})

	console.log(out.join('\n'))
	return out.join('\n')
}
