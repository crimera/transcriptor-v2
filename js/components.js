/* @param transcript { Transcript } */
export function transcriptItem(transcript) {
	return "<div class=\"transcript-item flex vcenter space-between\"><p>" + "[" + transcript.start + "->" + transcript.end + "] " + transcript.caption + "</p><button>Edit</button></div>"
}
