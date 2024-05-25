var socket = new WebSocket("ws://localhost:8080/whisper");
var output = document.getElementById("output")

socket.onopen = function () {
    console.log("Status: Connected\n")
};

socket.onmessage = function (e) {
    console.log("\nServer: " + e.data + "\n")
    output.textContent = output.textContent + e.data
};

function process() {
    socket.send("process")
}