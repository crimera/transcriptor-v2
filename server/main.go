package main

import (
	"log"
	"net/http"

	"github.com/ggerganov/whisper.cpp/bindings/go/pkg/whisper"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func main() {

	http.HandleFunc("/whisper", func(w http.ResponseWriter, r *http.Request) {
		upgrader.CheckOrigin = func(r *http.Request) bool { return true }

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
			conn.WriteMessage(mt, []byte(segment.Text))
		}

		process(cb)
	})

	http.ListenAndServe(":8080", nil)
}
