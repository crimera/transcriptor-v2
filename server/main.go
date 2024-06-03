package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/crimera/whisper.cpp/bindings/go/pkg/whisper"
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

type Message struct {
	Type      string `json:"type"`
	Filename  string `json:"filename"`
	Translate bool   `json:"translate"`
	Message   string `json:"message"`
	Num       int    `json:"num"`
	Caption   string `json:"caption"`
}

type ServerMessage struct {
	Type           string       `json:"type"`
	Transcriptions []Transcript `json:"transcriptions"`
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
			var msg Message

			err = conn.ReadJSON(&msg)
			if err != nil {
				fmt.Println(err.Error())
			}

			conn.WriteJSON(ServerMessage{
				Type: "bruh",
			})

			switch msg.Type {
			case "process":
				{
					currentTranscription = []Transcript{}

					fmt.Println("Processing")
					// conn.WriteMessage(messageType, []byte("processing"))
					err = conn.WriteJSON(ServerMessage{
						Type: "processing",
					})

					cb := func(segment whisper.Segment) {

						currentTranscription = append(currentTranscription, Transcript{
							Num:     segment.Num,
							Start:   parseTime(segment.Start),
							End:     parseTime(segment.End),
							Caption: segment.Text,
						})
						conn.WriteJSON(ServerMessage{
							Type:           "currentTranscription",
							Transcriptions: currentTranscription,
						})
					}

					e := process("models/"+getModels()[0], "files/"+msg.Filename, cb)
					if e != nil {
						// TODO: should post an error message
						// conn.WriteMessage(messageType, []byte("error"))
						conn.WriteJSON(ServerMessage{
							Type: "error",
						})
					}

					fmt.Println("Done processing")
					//conn.WriteMessage(messageType, []byte("done"))
					conn.WriteJSON(ServerMessage{
						Type: "done",
					})

					break
				}
			case "change":
				{
					fmt.Println("change called")
					// TODO: handle error
					currentTranscription[msg.Num].Caption = msg.Caption
					break
				}
			case "currentTranscription":
				{
					fmt.Println("Sent transcripts")
					conn.WriteJSON(ServerMessage{
						Type:           "currentTranscription",
						Transcriptions: currentTranscription,
					})
					break
				}
			case "clearCurrentTranscription":
				{
					fmt.Println("Transcriptions cleared")
					currentTranscription = []Transcript{}
					break
				}
			}
		}
	})

	http.ListenAndServe(":8080", nil)
}

func parseTime(duration time.Duration) string {
	hours := duration / time.Hour
	duration -= hours * time.Hour

	minutes := duration / time.Minute
	duration -= minutes * time.Minute

	seconds := duration / time.Second
	duration -= seconds * time.Second

	milliseconds := duration / time.Millisecond

	formattedTime := fmt.Sprintf("%02d:%02d:%02d,%03d", hours, minutes, seconds, milliseconds)
	return formattedTime
}
