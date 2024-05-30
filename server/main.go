package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

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

			messageType, messageByte, err := conn.ReadMessage()
			if err != nil {
				log.Println("read failed:", err)
				break
			}

			message := string(messageByte)

			fmt.Print(message)

			cmd := strings.Split(message, ":")

			switch cmd[0] {
			case "process":
				{
					currentTranscription = []Transcript{}

					fmt.Println("Processing")
					conn.WriteMessage(messageType, []byte("processing"))

					cb := func(segment whisper.Segment) {
						currentTranscription = append(currentTranscription, Transcript{
							Num:     segment.Num,
							Start:   fmt.Sprintf("%02.f:%02.f:%02.f", segment.Start.Hours(), segment.Start.Minutes(), segment.Start.Seconds()),
							End:     fmt.Sprintf("%02.f:%02.f:%02.f", segment.End.Hours(), segment.End.Minutes(), segment.End.Seconds()),
							Caption: segment.Text,
						})
						conn.WriteJSON(currentTranscription)
					}

					e := process("models/"+getModels()[0], "files/"+cmd[1], cb)
					if e != nil {
						// TODO: should post an error message
						conn.WriteMessage(messageType, []byte("error"))
					}

					fmt.Println("Done processing")
					conn.WriteMessage(messageType, []byte("done"))
					break
				}
			case "change":
				{
					// TODO: handle error
					num, _ := strconv.Atoi(cmd[1])
					currentTranscription[num].Caption = cmd[2]
					break
				}
			}

			switch message {
			case "currentTranscription":
				{
					fmt.Println("Sent transcripts")
					conn.WriteJSON(currentTranscription)
					break
				}
			case "clearCurrentTranscription":
				{
					currentTranscription = []Transcript{}
					break
				}
			}
		}
	})

	http.ListenAndServe(":8080", nil)
}
