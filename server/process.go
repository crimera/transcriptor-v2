package main

import (
	"fmt"
	"os"

	"github.com/ggerganov/whisper.cpp/bindings/go/pkg/whisper"
	wav "github.com/go-audio/wav"
)

func process(callback whisper.SegmentCallback) {
	var modelpath string = "ggml-base.en-q5_1.bin" // Path to the model
	var samples []float32                          // Samples to process
	filename := "test.wav"

	// Open the file
	fmt.Printf("Loading %q\n", filename)
	fh, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer fh.Close()

	// Decode the WAV file - load the full buffer
	dec := wav.NewDecoder(fh)
	if buf, err := dec.FullPCMBuffer(); err != nil {
		panic(err)
	} else if dec.SampleRate != whisper.SampleRate {
		fmt.Printf("unsupported sample rate: %d", whisper.SampleRate)
		fmt.Printf("unsupported sample rate: %d", dec.SampleRate)
	} else if dec.NumChans != 1 {
		fmt.Printf("unsupported number of channels: %d", dec.NumChans)
	} else {
		samples = buf.AsFloat32Buffer().Data
	}

	// Load the model
	model, err := whisper.New(modelpath)
	if err != nil {
		panic(err)
	}
	defer model.Close()

	// Process samples
	context, err := model.NewContext()
	if err != nil {
		panic(err)
	}

	if err := context.Process(samples, callback, nil); err != nil {
		panic(err)
	}
}
