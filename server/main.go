package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ggerganov/whisper.cpp/bindings/go/pkg/whisper"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}
var currentTranscription = []Transcript{}

type Transcript struct {
	Num     int    `json:"num"`
	Start   string `json:"start"`
	End     string `json:"end"`
	Caption string `json:"caption"`
}

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

		for {

			messageType, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("read failed:", err)
				break
			}

			switch string(message) {
			case "process":
				{
					currentTranscription = []Transcript{}

					fmt.Println("Processing")
					conn.WriteMessage(messageType, []byte("processing"))

					cb := func(segment whisper.Segment) {
						currentTranscription = append(currentTranscription, Transcript{
							Num:     segment.Num,
							Start:   fmt.Sprintf("%02.f:%02.f:%02.f", segment.Start.Hours(), segment.Start.Minutes(), segment.End.Seconds()),
							End:     fmt.Sprintf("%02.f:%02.f:%02.f", segment.End.Hours(), segment.End.Minutes(), segment.End.Seconds()),
							Caption: segment.Text,
						})
						conn.WriteJSON(currentTranscription)
					}

					process("models/"+getModels()[0], "files/test.wav", cb)

					fmt.Println("Done processing")
					conn.WriteMessage(messageType, []byte("done"))
					break
				}
			case "currentTranscription":
				{
					fmt.Println("Sent transcripts")
					conn.WriteJSON(currentTranscription)
					break
				}
			case "clearCurrentTranscription":
				{
					currentTranscription = []Transcript{}
				}
			}
		}
	})

	http.ListenAndServe(":8080", nil)
}
