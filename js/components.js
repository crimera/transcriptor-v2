/* @param transcript { Transcript } */
export function transcriptItem(transcript, id, editClicked) {
	let caption = pharagraphView({
		classList: "mr-xs caption",
		text: transcript.caption
	})

	let editing = false

	const transcriptContainer = divView({
		classList: 'transcript-item flex vcenter space-between',
		content: [
			caption,
		]
	})

	const editButton = buttonView({
		id: id,
		content: [
			imgView({ src: "assets/icons/create-outline.svg", width: 15, height: 15 })
		],
		onClick: () => {
			const input = transcriptContainer.firstChild

			if (editing) {
				caption.textContent = input.value
				input.replaceWith(caption)

				editClicked(id, input.value)
				editing = false
			} else {
				// TODO: make width fill up space
				input.replaceWith(textAreaView({
					width: input.clientWidth,
					height: input.clientHeight,
					value: input.textContent,
					fontFamily: 'sans-serif',
					fontSize: 15
				}))

				editing = true
			}
		},
	})

	transcriptContainer.appendChild(editButton)

	return transcriptContainer
}

/**
 * @param {Object} options
 * @param {string} options.src
 * @param {number} options.width
 * @param {number} options.height
 * @param {Function} options.onClick
 * @param {HTMLElement[]} options.content
 **/
function imgView(options) {
	const element = document.createElement('img')
	element.src = options.src

	if (options.width)
		element.width = options.width

	if (options.height)
		element.height = options.height

	if (options.content) {
		options.content.forEach((e) => {
			element.appendChild(e)
		})
	}


	return element
}

/**
 * @param {Object} options
 * @param {number} options.width
 * @param {number} options.height
 * @param {Function} options.onClick
 * @param {HTMLElement[]} options.content
 * @param {string} options.placeHolder
 * @param {string} options.value
 * @param {number} options.fontSize
 * @param {string} options.fontFamily
 **/
function textAreaView(options) {
	const element = document.createElement('textarea')

	if (options.width)
		element.style.width = options.width

	if (options.height)
		element.style.height = options.height

	if (options.fontSize)
		element.style.fontSize = options.fontSize

	if (options.fontFamily)
		element.style.fontFamily = options.fontFamily

	if (options.onClick) {
		element.addEventListener('click', (e) => {
			options.onClickbutton(e)
		})
	}

	if (options.placeHolder)
		element.placeholder = options.placeHolder

	if (options.value)
		element.value = options.value

	return element
}


/**
 * @param {Object} options
 * @param {string} options.src
 * @param {string} options.classList
 * @param {text} options.text
 * @param {HTMLElement[]} options.content
 **/
function pharagraphView(options = {}) {
	const element = document.createElement('p')

	if (options.text)
		element.textContent = options.text

	if (options.classList)
		element.classList = options.classList

	if (options.content) {
		options.content.forEach((e) => {
			element.appendChild(e)
		})
	}

	return element
}


/**
 * @param {Object} options
 * @param {string} options.id
 * @param {string} options.src
 * @param {number} options.width
 * @param {number} options.height
 * @param {string} options.classList
 * @param {string} options.text
 * @param {Function} options.onClick
 * @param {HTMLElement[]} options.content
 **/
function buttonView(options = {}) {
	const element = document.createElement('button')

	if (options.id) element.id = options.id

	if (options.classList) element.classList = options.classList

	if (options.text)
		element.textContent = options.text

	if (options.content) {
		options.content.forEach((e) => {
			element.appendChild(e)
		})
	}

	if (options.onClick) {
		element.addEventListener('click', (e) => {
			options.onClick(e)
		})
	}

	return element
}

/**
 * @param {Object} options
 * @param {string} options.src
 * @param {string} options.classList
 * @param {HTMLElement[]} options.content
 **/
function divView(options = {}) {
	const element = document.createElement('div')

	if (options.classList)
		element.classList = options.classList

	if (options.content) {
		options.content.forEach((e) => {
			element.appendChild(e)
		})
	}

	return element
}
