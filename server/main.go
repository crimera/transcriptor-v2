package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ggerganov/whisper.cpp/bindings/go/pkg/whisper"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func main() {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	http.HandleFunc("/whisper", func(w http.ResponseWriter, r *http.Request) {

		// Upgrade upgrades the HTTP server connection to the WebSocket protocol.
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Print("upgrade failed: ", err)
			return
		}
		defer conn.Close()

		mt, _, err := conn.ReadMessage()
		if err != nil {
			log.Println("read failed:", err)
		}

		cb := func(segment whisper.Segment) {
			output := fmt.Sprintf("%2d [%s->%s] : %s", segment.Num, segment.Start, segment.End, segment.Text)
			conn.WriteMessage(mt, []byte(output))
			log.Println(output)
		}

		process("models/"+getModels()[0], "files/test.wav", cb)
	})

	http.ListenAndServe(":8080", nil)
}
